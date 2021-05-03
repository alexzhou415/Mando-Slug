
class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.hero = this.game.addHero();
    this.ctx = ctx;
  }

  keydownFunc(e){
    keys[e.key] = true;

    if (keys["w"]) {
      that.hero.up = true;
    }
    if (keys["a"] && that.hero.pos[0] > 0) {
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
    }
  }

  bindKeyHandlers() {
    const keys = [];
    let that = this;
    document.addEventListener("keydown", function (e) {
      keys[e.key] = true;
      if (keys["w"]) {
        that.hero.up = true;
      }
      if (keys["a"] && that.hero.pos[0] > 0) {
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

  start() {
    this.bindKeyHandlers();
    this.lastTime = Date.now();
    this.fpsInterval = 1000/10;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    this.now = Date.now();
    const delta = this.now - this.lastTime;
    if (delta > this.fpsInterval){
      this.lastTime = this.now - (delta % this.fpsInterval);
      this.game.step(delta);
      this.game.draw(this.ctx);
    }

    requestAnimationFrame(this.animate.bind(this));
  }
}

module.exports = GameView;