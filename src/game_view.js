const Game = require("./game");
const Hero = require("./hero");

class GameView {

  constructor(game, ctx) {
    this.game = game;
    this.hero = this.game.addHero();
    this.ctx = ctx;
    console.log(this.game);
    console.log("in constructor");
  }


  bindKeyHandlers(){
    const keys = [];
    let that = this;
    document.addEventListener("keydown", function (e) {

      keys[e.key] = true;
      if (keys["w"] && that.hero.pos[0] > 0) {
        that.hero.dir = "up";
      }
      if (keys["a"] && that.hero.pos[0] > 0) {
        that.hero.moving = true;
        that.hero.vel = -10;
        that.hero.frameY = 1;
        that.hero.dir = "left";
      }
      if (keys["d"] && that.hero.pos[0] < that.game.DIM_X - that.hero.width) {
        that.hero.moving = true;
        that.hero.vel = 10;
        that.hero.frameY = 2;
        that.hero.dir = "right";
      }
      
    });

    document.addEventListener("keyup", function (e) {
      delete keys[e.key];
      that.hero.vel = 0;
      that.hero.moving = false;
    });
  }

  // handleHeroFrame(){
  //   if (this.hero.frameX < 3 && this.hero.moving) this.hero.frameX += 1;
  //   else this.hero.frameX = 0;
  // }
  

  start(){
    this.bindKeyHandlers();
    let that = this;
    setInterval( function(){
      that.game.step();
      that.game.draw(that.ctx);
      // that.handleHeroFrame();
    }, 100)
  }
}

module.exports = GameView;