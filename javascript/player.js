
var game;

class Player {
    static p = 0;
    static _me = 0;

    static get me() {
        return Player._me;
    }

    static set me(value) {
        players[value].num = Player._me = value;
    }

    static colors = ["#FF0000", "#00FF00", "#0000FF"];
    static height = 8;
    static sprites = [document.getElementById("sprite1"), document.getElementById("sprite2")];
    
    // starting positions   P1        P2
    static #positions = [[4, 60], [120, 60]]

    #_state = 0;
    set state(value) {
        if(value == this.#_state) {
            return;
        }
        this.#_state = value;
        this.clear();
        this.draw();
    }

    get state() {
        return this.#_state;
    }

    constructor() {
        this.num = Player.p++;
        this.state = this.strength = 0;
        this.bg;
        this.color = Player.colors[this.num];
        this.resetPosition();
    }

    draw() {
        this.bg = context.getImageData(this.x * xScale, this.y * yScale, 8 * xScale, 8 * yScale);

        // context.fillStyle = this.color;
        context.drawImage(Player.sprites[this.#_state], this.x, this.y, 8, 8);
        // context.drawImage(Player.sprites[0], this.x * xScale, this.y * yScale, 8 * xScale, 8 * yScale);
    }

    clear() {
        context.putImageData(this.bg, this.x * xScale, this.y * yScale);
    }

    resetPosition() {
        let pos = Player.#positions[this.num];
        this.x = pos[0];
        this.y = pos[1];
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
        
        this.clear();
        
        if(! (left || right || center == true) ) {
            this.y += 4;
        } else {
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
            } else if(dx < 0) {
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

        if(this.num == Player.me && (this.x != oldX || this.y != oldY)) {
            game.peerConnection.send({
                type: 'player',
                num: this.num,
                state: this.state,
                x: this.x,
                y: this.y,
            });
            console.log("send");
        }

        this.draw();
    }

    charge() {
        // player.state = charging;
        if(this.strength < 80) {
            this.strength++;
        }

        if(this.state != 1) {
            game.peerConnection.send({
                type: 'charging',
                senderNum: this.num
            });
            this.state = 1;
        }
    }

    fire() {
        let dir = this.num & 1 == 1 ? -1 : 1;

        Bomb.bombs.push(new Bomb(this.strength, dir, this.x, this.y));
        game.peerConnection.send({
            type: 'bomb',
            str: this.strength,
            direction: dir,
            senderNum: this.num,
            x: this.x,
            y: this.y
        })
        this.state = this.strength = 0;
    }

    static add() {
        let p = new Player();
        players.push(p);
        p.draw(); // initialize this.bg
        p.clear();
    }

    static getTile(x, y) {
        if(x <= 0 || x > 128) {
            return true;
        } else if(y > 122) {
            return true;
        }

        let tx = Math.floor(x / 4);
        let ty = Math.floor(y / 4);
        let t = game.map[tx + ty * game.mapWidth];
        // console.log("x:" + x + " y: " + y, "tx:" + tx, "ty: " + ty, "solid:" + t);
        return t;

    }

    
}


Player.sprites[0].width = Player.sprites[1].width = 64;
Player.sprites[0].height = Player.sprites[1].height = 64;