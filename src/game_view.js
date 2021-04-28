const Game = require("./game");
const Hero = require("./hero");

class GameView {

  constructor(game, ctx) {
    this.game = game;
    this.game.addHero();
    this.ctx = ctx;
    console.log(this.game);
    console.log("in constructor");
  }

  start(){
    let that = this;
    setInterval( function(){
      that.game.moveObjects();
      that.game.draw(that.ctx);
    }, 1000)
  }
}

module.exports = GameView;