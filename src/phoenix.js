const Enemy = require("./enemy");

class Phoenix extends Enemy {
  constructor(options) {
    super(options);
    this.width = 48;
    this.height = 72;
    this.pos = options.pos;
    this.vel = 10;
    this.dir = options.dir;
    this.frameY = options.frameY;
    this.phoenixSprite = new Image();
    this.phoenixSprite.src = "../src/sprites/phoenix.png";
  }

  draw(ctx) {
    ctx.drawImage(
      this.phoenixSprite,
      96 * this.frameX,
      96 * this.frameY,
      96,
      96,
      this.pos[0],
      this.pos[1],
      this.width,
      this.height
    );
  }
}

module.exports = Phoenix;
