const GRAVITY = 0.125;
const ACCEL = 0.031 * 3/2;

class Bomb {
    static get size() {
        return 4;
    }
    
    static get ACCEL() {
    	return ACCEL;
    }
    
    static get GRAVITY () {
    	return GRAVITY;
    }

    // og function at max power = 1/64 * (x^2) - 2x + 128 or 1/64*(x-64)^2+64
    // derivative = 2*c - 2*x + (x^2)/c
    // derivative = 2*(c - x) + (x^2)/c
    constructor(power, direction, x, y, playerNum) {
        this.power = power
        this.direction = direction;
        this.x = x + 4;
        this.y = y - 4;
        this.playerNum = playerNum;
        this.velocityX = power * ACCEL;
        this.velocityY = power * ACCEL;
        this.bg;

        this.draw();
        this.clear();
    }

    draw() {
        this.bg = context.getImageData(this.x * xScale, this.y * yScale, Bomb.size * xScale, Bomb.size * yScale);

        context.fillStyle = "#00FF00";
        context.fillRect(this.x, this.y, Bomb.size, Bomb.size);
    }

    clear() {
        context.putImageData(this.bg, this.x * xScale, this.y * yScale);
    }

    static getAll() {
        return gameState.bombs;
    }

    static add(power, dir, x, y, playerNum) {
        gameState.bombs.push(new Bomb(power, dir, x, y, playerNum));
    }

    static clearAll() {
        let bombs = Bomb.getAll();

        for(let i = 0; i < bombs.length; i++) {
            bombs[i].clear();
        }

    }

    static drawAll() {
        let bombs = Bomb.getAll();

        for(let i = 0; i < bombs.length; i++) {
            bombs[i].draw();
        }
    }

    destroy() {
        let bombs = Bomb.getAll();
        bombs.splice(bombs.indexOf(this), 1);
        game.removeTile(this.x, this.y + Bomb.size);
    }
    

    move() {
        
        // delete if necessary
        if(Player.getTile(this.x, this.y + Bomb.size) || this.y > 128) {
            this.destroy();
            return;
        } 
        for(let i = 0; i < players.length; i++) {
            let px = Math.floor((players[i].x + 4) / 8), py = Math.floor((players[i].y) / 8);
            if(this.playerNum != players[i].num && px == Math.floor(this.x / 8) && py == Math.floor(this.y / 8)) {
                players[i].isDead = true;
                this.destroy();
                return;
            }

        }
        
        this.x += Math.floor(this.direction * this.velocityX);
        this.y -= Math.floor(this.velocityY);
        this.velocityY -= GRAVITY;
        // y' = -x/(power/2) + 64/power
        // this.y -= Math.floor(-2*this.tick/(64-this.power) + 64/(64-this.power));
    }
    
}