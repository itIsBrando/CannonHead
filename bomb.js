
class Bomb {
    static bombs = [];
    static maxPower = 45;
    static size = 4;

    // og function at max power = 1/64 * (x^2) - 2x + 128 or 1/64*(x-64)^2+64
    // derivative = 2*c - 2*x + (x^2)/c
    // derivative = 2*(c - x) + (x^2)/c
    constructor(power, x, y) {
        this.power = Math.max(power, 1);
        this.bg;
        this.tick = 0;
        this.x = x + 3;
        this.y = y - 4;
        this.draw();
        this.clear();
    }

    draw() {
        console.log("p:" + this.power);
        this.bg = context.getImageData(this.x, this.y, Bomb.size, Bomb.size);

        context.fillStyle = "#00FF00";
        context.fillRect(this.x, this.y, Bomb.size, Bomb.size);
    }

    clear() {
        context.putImageData(this.bg, this.x, this.y);
    }


    move() {
        this.clear();
        
        // delete if necessary
        if(Player.getTile(this.x, this.y + Bomb.size)) {
            Bomb.bombs.splice(Bomb.bombs.indexOf(this), 1);
            game.removeTile(this.x, this.y + Bomb.size);
            
            return;
        }
        
        this.x++;
        // y' = -x/(power/2) + 64/power
        this.y -= Math.floor(-2*this.tick/(64-this.power) + 64/(64-this.power));
        
        this.draw();
        this.tick++;
    }
    
}