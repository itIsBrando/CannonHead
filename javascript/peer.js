function peerReceive(data) {
    switch(data["type"]) {
        case 'handshake':
            Player.add();
            gameState.me = data['players'];
            gameState.playUntil = data['maxScore'];
            break;
        case 'map':
            console.log("GOT MAP");
            game.mapNum = data['mapNum'];
            game.reset();
            break;
        case 'player':
            let p = data['num'];
            let drawn = players[p].isDrawn;
            players[p].isDead = data['isDead'];
            if(drawn) {

                players[p].clear();
            }
            players[p].x = data['x'];
            players[p].y = data['y'];
            players[p]._state = data['state'];
            
            if(drawn) {
                players[p].draw();
            }

            break;
        case 'charging':
            players[data['senderNum']].state = 2;
            break;
        case 'bomb':
            let str = data['str'];
            let dir = data['direction'];
            let x = data['x'];
            let y = data['y'];
            let sender = data['senderNum'];
            players[sender].state = 0;
            Bomb.add(str, dir, x, y, sender);
            break;
        case 'gameover':
            // we cannot call game.lose because game.lose will reselect a map
            game.scores = data['scores'];
            game.mapNum = data['nextLevel'];
            game.reset();
            break;
        case 'roundOver':
            // called when max score is reached
            game.breakUpdate = true;
            break;
        default:
            console.log("Unknown receiving type.");
    }

    // console.log(data);
}


function peerSetGuest() {
    peer.on('connection', function(connection) {
        connection.on('data', peerReceive);
        console.log("guest is connected\n\n");
        Game.run(false, connection);
    });
    console.log("you are guest");

}