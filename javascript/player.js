const sprites = [document.getElementById("sprite1"), document.getElementById("sprite3"), document.getElementById("sprite2")];
var game;


class Player {
    static get height() {
        return 8;
    }
    
    constructor() {
        // const colors = ["#FF0000", "#00FF00", "#0000FF"];
        this.isDrawn = false;
        this.tick = this.dir = -1 // for CPU only
        this.bg;
        this.num = gameState.playerNumber++;
        this.state = this.strength = 0;
        // this.color = colors[this.num];
        this.x = this.y = 1;
        this.isDead = false;
        this.isCPU = false;
        this.cooldown = 0; // only used for CPU
    }
 

    draw() {
        this.isDrawn = true;
        this.bg = context.getImageData(this.x * xScale, this.y * yScale, 8 * xScale, 8 * yScale);
        
        context.drawImage(sprites[this.state], this.x, this.y);
    }
    
    
    clear() {
        this.isDrawn = false;
        context.putImageData(this.bg, this.x * xScale, this.y * yScale);
    }


    resetPosition() {
        let x = this.num == 0 ? 30 : 100;
        let y = 60;
        
        do {
        	y += 4;
        } while (Player.getTile(x, y) == false);
        
        this.x = x;
        this.y = y - 12;

    }


    move(dx) {
        let oldX = this.x, oldY = this.y;
        let xRight = this.x + 6;
        let xLeft = this.x + 1;
        let xCenter = this.x + 3;
        let yEqual = this.y;
        let yAbove = this.y - 4;
        let yBelow = this.y + Player.height;
        let right =  Player.getTile(xRight,  yBelow);
        let left =   Player.getTile(xLeft,   yBelow);
        let center = Player.getTile(xCenter, yBelow);

        if(this.y >= 128) {
            game.lose(this.num);
            return;
        }
        
        if(! (left || right || center == true) ) {
            this.y += 4;
        } else if(dx != 0){
            // disallow movement while charging
            if(this.strength > 0) {
                // this.draw();
                return;
            } else {
								// animate player
           		 	this.state = (this.state + 1) & 1;
            }

            

            if(dx > 0) {
                // right jump
                if(Player.getTile(xRight, yAbove) == false) {
                    this.y -= 4;
                    this.x += dx;
                }

                // move right
                if(Player.getTile(xRight, yEqual) == false) {
                    this.x += dx;
                }
            } else {
                // left jump
                if(Player.getTile(xLeft, yAbove) == false) {
                    this.y -= 4;
                    this.x += dx;
                }

                // move left
                if(Player.getTile(xLeft, yEqual) == false) {
                    this.x += dx;
                }
            }
        }

        if(this.num == gameState.me && (this.x != oldX || this.y != oldY)) {
            game.send({
                type: 'player',
                num: this.num,
                state: this.state,
                isDead: this.isDead,
                x: this.x,
                y: this.y,
            });
            
        }

    }


    // call every frame but does nothing if this.isDead == false
    fall() {
        if(!this.isDead) {
            this.dy = -10;
            return;
        }

        this.y += Math.floor(this.dy);
        this.dy++;

        if(this.y > 128) {
            /* don't perform this is the player dying is not us
            because we will receive a death message from other peer */
            if(gameState.me == this.num) {
                game.lose(this.num);
                this.isDead = false;
                return;
            }

            this.isDead = false;
        }

    }


    charge() {
        // player.state = charging;
        if(this.strength < 100) {
            this.strength++;
        }

        if(this.state != 2) {
            game.send({
                type: 'charging',
                senderNum: this.num
            });
            this.state = 2;
        }
    }


    fire() {
        let dir = this.num & 1 == 1 ? -1 : 1;

        Bomb.add(this.strength, dir, this.x, this.y, this.num);
        // send the bomb
        game.send({
            type: 'bomb',
            str: this.strength,
            direction: dir,
            senderNum: this.num,
            x: this.x,
            y: this.y
        })

        this.state = this.strength = 0;
    }

    static drawAll() {
        players.forEach(p => {
            p.draw();
        });
    }

    static clearAll() {
        players.forEach(p => {
            p.clear();
        });
    }

    static clearAllSafely() {
        players.forEach(p => {
            if(p.isDrawn) {p.clear();}
        });
    }

    static add() {
        let p = new Player();
        players.push(p);
        p.draw(); // initialize this.bg
        p.clear();
    }


    static getTile(x, y) {
        if(x <= 0 || x > 128) {
            return  false;
        } else if(y > 128) {
            return false;
        }

        let tx = Math.floor(x / 4);
        let ty = Math.floor(y / 4);
        let t = game.map[tx + ty * GameState.mapWidth];
        return t;

    }
    

    // called every frame
    doCPU() {
        let r = Math.floor(Math.random() * 100);
        this.tick++;

        if(r >= 98 || this.strength > 0) {
                if(this.cooldown <= 0) {
                    this.charge();
                    this.cooldown = 15;
            }

            this.cooldown--;

            if(this.strength == Math.floor(7.5*2/3*Math.sqrt(this.x - players[0].x)) || this.strength >= 70)
                this.fire();

        }

      
        // handle movement
        let chkUnder = Player.getTile(this.x + 3, this.y + 16) || Player.getTile(this.x + 3, this.y + 16);
        let chkDirUnder = Player.getTile(this.x + 3 + 4*this.dir, this.y + 16) || Player.getTile(this.x + 3 + 4*this.dir, this.y + 16);

        if(chkUnder == false && chkDirUnder == false) {
            this.dir *= -1;
        }

        if((this.tick & 8) == 8) {
            this.tick = 0;
            this.move(this.dir);
        }
    }

    
}
