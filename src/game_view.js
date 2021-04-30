// const Game = require("./game");
// const Hero = require("./hero");

class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.hero = this.game.addHero();
    this.ctx = ctx;
    // console.log(this.game);
    // console.log("in constructor");
  }

  keydownFunc(e){
    keys[e.key] = true;
    // const oldDir = that.hero.dir;
    // console.log(that.hero.dir);
    if (keys["w"]) {
      that.hero.up = true;
    }
    if (keys["a"] && that.hero.pos[0] > 0) {
      // console.log(that.hero.pos);
      that.hero.moving = true;
      that.hero.vel = 20;
      that.hero.frameY = 1;
      that.hero.dir = "left";
    }
    if (keys["d"] && that.hero.pos[0] < that.game.DIM_X - that.hero.width) {
      that.hero.moving = true;
      that.hero.vel = 20;
      that.hero.frameY = 2;
      that.hero.dir = "right";
    }

    if (keys[" "]) {
      that.hero.shoot();
      console.log("shooting");
    }
  }

  bindKeyHandlers() {
    const keys = [];
    let that = this;
    document.addEventListener("keydown", function (e) {
      keys[e.key] = true;
      // const oldDir = that.hero.dir;
      // console.log(that.hero.dir);
      if (keys["w"]) {
        that.hero.up = true;
      }
      if (keys["a"] && that.hero.pos[0] > 0) {
        // console.log(that.hero.pos);
        that.hero.moving = true;
        that.hero.vel = 20;
        that.hero.frameY = 1;
        that.hero.dir = "left";
      }
      if (keys["d"] && that.hero.pos[0] < that.game.DIM_X - that.hero.width) {
        that.hero.moving = true;
        that.hero.vel = 20;
        that.hero.frameY = 2;
        that.hero.dir = "right";
      }

      if (keys[" "]) {
        that.hero.shoot();
        console.log("shooting");
      }
    });

    document.addEventListener("keyup", function (e) {
      if (keys["a"] || keys["d"]){
        that.hero.vel = 0;
        that.hero.moving = false;
      }

      if (keys["w"]) that.hero.up = false;
      delete keys[e.key];
    });
  }

  // handleHeroFrame(){
  //   if (this.hero.frameX < 3 && this.hero.moving) this.hero.frameX += 1;
  //   else this.hero.frameX = 0;
  // }

  start() {
    this.bindKeyHandlers();
    this.lastTime = Date.now();
    // this.then = Date.now();
    // this.startTime = this.then;
    this.fpsInterval = 1000/10;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    this.now = Date.now();
    const delta = this.now - this.lastTime;
    // this.now = Date.now();
    // this.elapsed = this.now - this.then
    if (delta > this.fpsInterval){
      this.lastTime = this.now - (delta % this.fpsInterval);
      this.game.step(delta);
      this.game.draw(this.ctx);
    }
    // this.game.step(delta);
    // this.game.draw(this.ctx);
    // this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this));
  }
}

module.exports = GameView;