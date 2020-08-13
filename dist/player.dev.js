"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var map = Array(128 * 64 / 4);

var Game =
/*#__PURE__*/
function () {
  function Game() {
    _classCallCheck(this, Game);
  } // initalizes a game


  _createClass(Game, null, [{
    key: "run",
    value: function run() {
      peerID = document.getElementById("IDInput").value;
      console.log(peerID);
      var connection = peer.connect(peerID); // send a handshake

      connection.on('open', function () {
        connection.send('hello');
        console.log('sent hello');
        players.push(new Player(2));
      });
      console.log("started game");
      inGame = true;
      players.forEach(function (element) {
        element.draw();
      });
    }
  }]);

  return Game;
}();

var Player =
/*#__PURE__*/
function () {
  function Player(number) {
    _classCallCheck(this, Player);

    this.playerNumber = number;
    this.x = this.y = 0;
  }

  _createClass(Player, [{
    key: "draw",
    value: function draw() {
      context.fillStyle = "#0000FF";
      context.fillRect(this.x, this.y, 8, 8);
    }
  }, {
    key: "clear",
    value: function clear() {
      context.fillStyle = "#000000";
      context.fillRect(this.x, this.y, 8, 8);
    }
  }, {
    key: "move",
    value: function move(dx, dy) {
      this.clear();
      this.x += dx;
      this.y += dy;
      this.draw();
    }
  }]);

  return Player;
}();