
class GameState {
    constructor() {
        this.bombs = [];
        this.playerNumber = 0;
        this._me = 0;
    }
    
    get me() {
        return this._me;
    }

    set me(value) {
        players[value].num = this._me = value;
    }

    static get mapWidth() {
        return 32;
    }
}

const map1 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 0,0,1,1,1,0,0,0,0,0,0,1,1,1,0,0,0,0,1,1,1,0,0,0,0,0,0,1,1,1,0,0, 0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0, 0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0, 0,0,1,1,1,0,0,0,0,0,0,1,1,1,0,0,0,0,1,1,1,0,0,0,0,0,0,1,1,1,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

class Game {
    
    constructor(isHost, peerConn) {
        this.scores = [0, 0, 0, 0];
        this.map = Array(Math.pow(GameState.mapWidth, 2));
        this.ogMap = Array(Math.pow(GameState.mapWidth, 2));
        this.isHost = isHost;
        this.peerConnection = peerConn;
        
        // initialize everything
        for(let i = 0; i < this.map.length; i++) {
            this.map[i] = false;
        }

        if(isHost) {
            // now load map
            // for(let i = this.map.length>>1; i < this.map.length; i++) {
            //     this.map[i] = Math.random() > 0.35 ? true : false;
            // }
            for(let i = 0; i < this.map.length; i++) {
                this.ogMap[i] = this.map[i] = map1[i] == 1;
            }
            setTimeout(() => {
                peerConn.send({type: 'map', map: this.map});
                console.log("sent map");
            }, 800);
            
            // enable receiving
            peerConn.on('data', peerReceive);
            
        }

        console.log(isHost);
        this.fullRedraw();
    }


    fullRedraw() {
        context.fillStyle = "#000000";
        context.fillRect(0, 0, canvas.width, canvas.height);
        this.draw();

        players.forEach(p => {
            p.draw();
        });

        Bomb.getAll().forEach(b => {
            b.draw();
        })

        context.font = "8px Arial";
        context.fillText(this.scores[0].toString(), 30, 8);
        context.fillText(this.scores[1].toString(), 128 - 30, 8);
    }


    update() {
        
        players.forEach(p => {
            p.move(0);
        });
        
        Bomb.getAll().forEach(b => {
            b.move();
        });

        window.requestAnimationFrame(game.update);
    }

    
    // initalizes a game
    // 2nd argument only for guest
    static run(isHost, conn) {
        peerID = document.getElementById("IDInput").value;
        let connection;
        
        // send a handshake
        if(isHost == true) {
            connection = peer.connect(peerID);
            connection.on('open', function() {
                connection.send({
                    type: 'handshake', players: gameState.playerNumber
                });
                console.log('sent hello');
                Player.add();
            });
        } else {
            connection = conn;
        }

        // set background color
        document.body.style.backgroundColor = 'black'
        // disable scrolling
        document.body.style.overflow = "hidden";
        // show canvas
        document.getElementById("canvasDiv").style.display = "block";


        document.getElementById("preGameDiv").style.display = "none";
        console.log("started game");
        inGame = true;

        players.forEach(element => {
           element.draw(); 
        });

        game = new Game(isHost, connection);
        setTimeout(() => {
            game.draw();
            game.update();
        }, 600);
    }

    // draws the map
    draw() {
        let x, y;

        context.fillStyle = "#FFFF0A";

        for(y = 0; y < 32; y++) {
            for(x = 0; x < GameState.mapWidth; x++) {
                if(this.map[y * GameState.mapWidth + x] == true) {
                    context.fillRect(x * 4, y * 4, 4, 4);
                    
                }
            }
        }

    }

    // pixel coordinates
    removeTile(x, y) {
        let tx = Math.floor(x / 4);
        let ty = Math.floor(y / 4);

        this.map[tx + GameState.mapWidth * ty] = false;
        context.fillStyle = "#000000";
        context.fillRect( x - x % 4, y - y % 4, 4, 4);
    }

    resetPlayers() {
        players.forEach(p => {
            p.resetPosition(); 
        });
    }

    reloadMap() {
        this.map = this.ogMap;
    }

    lose(playerNumber) {
        if(playerNumber == gameState.me) {
            this.peerConnection.send({
                type: 'gameover',
                death: playerNumber
            });
        }
        console.log("lose");
        this.scores[playerNumber == 1 ? 0 : 1]++;
        this.reloadMap();
        this.resetPlayers();
        this.fullRedraw();
    }

}