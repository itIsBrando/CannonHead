
var game;

class Game {
    mapWidth = 32;
    
    constructor() {
        this.map = Array(this.mapWidth * this.mapWidth);
        
        // initialize everything
        for(let i = 0; i < this.map.length; i++) {
            this.map[i] = false;
        }

        // now load map
        for(let i = this.map.length>>1; i < this.map.length; i++) {
            this.map[i] = Math.random() > 0.35 ? true : false;
        }
        
        console.log("map init");
    }

    
    update() {
        
        players.forEach(p => {
            p.move(0);
        });
        
        Bomb.bombs.forEach(b => {
            b.move();
        });
        window.requestAnimationFrame(game.update);
    }

    
    // initalizes a game
    static run(isHost) {
        peerID = document.getElementById("IDInput").value;
        console.log(peerID);
        let connection = peer.connect(peerID);
        
        // send a handshake
        if(isHost == true) {
            connection.on('open', function() {
                connection.send('hello');
                console.log('sent hello');
                Player.add();
            });
        }
        
        console.log("started game");
        inGame = true;

        players.forEach(element => {
           element.draw(); 
        });

        game = new Game();
        game.draw();
        game.update();
    }

    draw() {
        let x, y;

        context.fillStyle = "#FFFF0A";

        for(y = 0; y < 32; y++) {
            for(x = 0; x < this.mapWidth; x++) {
                if(this.map[y * this.mapWidth + x] == true) {
                    context.fillRect(x * 4, y * 4, 4, 4);
                    
                }
            }
        }

    }
}


class Bomb {
    static bombs = [];
    static maxPower = 45;

    // og function at max power = 1/64 * (x^2) - 2x + 128 or 1/64*(x-64)^2+64
    // derivative = 2*c - 2*x + (x^2)/c
    // derivative = 2*(c - x) + (x^2)/c
    constructor(power, x, y) {
        this.power = power/2 + 2;
        this.bg;
        this.tick = 0;
        this.x = x;
        this.y = y - 4;
        this.draw();
        this.clear();
    }

    draw() {
        console.log("p:" + this.power);
        this.bg = context.getImageData(this.x, this.y, 8, 8);

        context.fillStyle = "#00FF00";
        context.fillRect(this.x, this.y, 8, 8);
    }

    clear() {
        context.putImageData(this.bg, this.x, this.y);
    }


    move() {
        this.clear();
        
        // delete if necessary
        if(Player.getTile(this.x, this.y)) {
            Bomb.bombs.splice(Bomb.bombs.indexOf(this), 1);
            return;
        }
        
        this.x++;
        // y' = -x/(power/2) + 64/power
        this.y -= Math.floor(-2*this.tick/(64-this.power) + 64/(64-this.power));
        
        this.draw();
        this.tick++;
    }
    
}

class Player {
    static p = 0;
    static colors = ["#FF0000", "#00FF00", "#0000FF"];
    static height = 8;

    constructor() {
        this.num = Player.p++;
        this.x = 64-4;
        this.strength = this.y = 0;
        this.bg;
        this.color = Player.colors[this.num];
        console.log(this.color);
    }

    draw() {
        this.bg = context.getImageData(this.x, this.y, 8, 8);

        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, 8, 8);
    }

    clear() {
        context.putImageData(this.bg, this.x, this.y);
    }

    move(dx) {
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

        this.draw();
    }

    charge() {
        // player.state = charging;
        if(this.strength < 80) {
            this.strength++;
        }

    }

    fire() {
        console.log("py:"+this.y);
        Bomb.bombs.push(new Bomb(this.strength, this.x, this.y));
        this.strength = 0;
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