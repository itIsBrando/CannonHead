const GRAVITY = 0.125;

class Bomb {
    static get size() {
        return 4;
    }

    // og function at max power = 1/64 * (x^2) - 2x + 128 or 1/64*(x-64)^2+64
    // derivative = 2*c - 2*x + (x^2)/c
    // derivative = 2*(c - x) + (x^2)/c
    constructor(power, direction, x, y) {
        this.power = Math.max(power, 1);
        this.direction = direction;
        this.x = x + 4;
        this.y = y - 4;
        this.velocityX = power * 0.0315;
        this.velocityY = power * 0.0315;
        this.tick = 0;
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

    static add(power, dir, x, y) {
        gameState.bombs.push(new Bomb(power, dir, x, y));
    }

    move() {
        this.clear();
        
        // delete if necessary
        if(Player.getTile(this.x, this.y + Bomb.size) || this.y > 128) {
            let bombs = Bomb.getAll();
            bombs.splice(bombs.indexOf(this), 1);
            game.removeTile(this.x, this.y + Bomb.size);
            
            return;
        }
        
        this.x += Math.floor(this.direction * this.velocityX);
        this.y -= Math.floor(this.velocityY);
        this.velocityY -= GRAVITY;
        // y' = -x/(power/2) + 64/power
        // this.y -= Math.floor(-2*this.tick/(64-this.power) + 64/(64-this.power));
        
        this.draw();
        this.tick++;
    }
    
}