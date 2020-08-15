function peerReceive(data) {
    switch(data["type"]) {
        case 'handshake':
            Player.add();
            gameState.me = data['players'];
            // peerSetGuest();
            // Game.run(false);
            break;
        case 'map':
            console.log("GOT MAP");
            game.map = data['map'];
            game.fullRedraw();
            break;
        case 'player':
            let p = data['num'];
            if(p == gameState.me) { break;}
            players[p].clear();
            players[p].x = data['x'];
            players[p].y = data['y'];
            players[p].state = data['state'];
            players[p].draw();
            break;
        case 'charging':
            players[data['senderNum']].state = 1;
            break;
        case 'bomb':
            let str = data['str'];
            let dir = data['direction'];
            let x = data['x'];
            let y = data['y'];
            let sender = data['senderNum'];
            players[sender].state = 0;
            Bomb.add(str, dir, x, y);
            break;
        case 'gameover':
            game.scores[gameState.me]++;
            game.resetPlayers();
            game.fullRedraw();
            break;
        default:
            console.log("Unknown receive");
    }

    console.log(data);
}


function peerSetGuest() {
    peer.on('connection', function(connection) {
        connection.on('data', peerReceive);
        console.log("guest is connected\n\n");
        Game.run(false, connection);
    });
    console.log("you are guest");

}