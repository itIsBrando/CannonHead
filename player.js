var map = Array(128 * 64 / 4);

class Game {
    constructor() {

    }

    // initalizes a game
    static run() {
        peerID = document.getElementById("IDInput").value;
        console.log(peerID);
        let connection = peer.connect(peerID);

        // send a handshake
        connection.on('open', function() {
            connection.send('hello');
            console.log('sent hello');
            players.push(new Player(2));
        });

        console.log("started game");
        inGame = true;

        players.forEach(element => {
           element.draw(); 
        });
    }
}


class Player {
    constructor(number) {
        this.playerNumber = number
        this.x = this.y = 0;
    }

    draw() {
        context.fillStyle = "#0000FF"
        context.fillRect(this.x, this.y, 8, 8);
    }

    clear() {
        context.fillStyle = "#000000"
        context.fillRect(this.x, this.y, 8, 8);
    }

    move(dx, dy) {
        this.clear();
        this.x += dx;
        this.y += dy;
        this.draw();
    }
}