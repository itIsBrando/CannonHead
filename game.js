
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

    // pixel coordinates
    removeTile(x, y) {
        let tx = Math.floor(x / 4);
        let ty = Math.floor(y / 4);

        this.map[tx + this.mapWidth * ty] = false;
        context.fillStyle = "#000000";
        context.fillRect( x - x % 4, y - y % 4, 4, 4);
    }
}