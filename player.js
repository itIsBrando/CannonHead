
var game;

class Game {
    mapWidth = 32;
    
    constructor() {
        this.map = Array(this.mapWidth * 16);
        
        for(let i = 0; i < this.map.length; i++) {
            this.map[i] = Math.random() > 0.5;
        }
        
        console.log("map init");
    }
    
    update() {
        players[0].move(0, 1);
        
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

        context.fillStyle = "#0F2F1F"
        for(y = 0; y < 16; y++) {
            for(x = 0; x < 32; x++) {
                if(this.map[y * 32 + x] == true) {
                    context.fillRect(x * 4, y * 4 + 64, 4, 4);
                    
                }
            }
        }

    }
}

class Player {
    static p = 0;
    static colors = ["#FF0000", "#00FF00", "#0000FF"];

    constructor() {
        this.num = Player.p++;
        this.x = this.y = 0;
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

    move(dx, dy) {
        if(Player.getTile(this.x + dx, this.y + dy)) {
            return;
        }

        this.clear();
        this.x += dx;
        this.y += dy;
        this.draw();
    }

    static add() {
        let p = new Player();
        players.push(p);
        p.draw(); // initialize this.bg
        p.clear();
    }

    static getTile(x, y) {
        if(x < 0 || x > 128 - 8 || y > 128-8) {
            return true;
        }

        if(y < 64 - 8) {
            return false;
        }

        let tx = ((x+4) / 8);
        let ty = ((y - 64 + 8) / 8);
        return game.map[tx + ty * game.mapWidth];

    }
}