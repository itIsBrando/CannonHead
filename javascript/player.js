
var game;


class Player {
    static p = 0;
    static colors = ["#FF0000", "#00FF00", "#0000FF"];
    static height = 8;
    static sprites = [document.getElementById("sprite1")];
    // starting positions   P1        P2
    static #positions = [[4, 60], [120, 60]]

    constructor() {
        let pos = Player.#positions[Player.p];
        this.x = pos[0];
        this.y = pos[1];
        this.num = Player.p++;
        Player.sprites[0].width = 64;
        Player.sprites[0].height = 64;
        this.strength = 0;
        this.bg;
        this.color = Player.colors[this.num];
    }

    draw() {
        this.bg = context.getImageData(this.x * xScale, this.y * yScale, 8 * xScale, 8 * yScale);

        // context.fillStyle = this.color;
        context.drawImage(Player.sprites[0], this.x, this.y, 8, 8);
        // context.drawImage(Player.sprites[0], this.x * xScale, this.y * yScale, 8 * xScale, 8 * yScale);
    }

    clear() {
        context.putImageData(this.bg, this.x * xScale, this.y * yScale);
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