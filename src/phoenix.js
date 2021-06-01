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
    this.titanSprite = new Image();
    this.titanSprite.src = "../src/sprites/phoenix.png";
  }

  draw(ctx) {
    ctx.drawImage(
      this.titanSprite,
      40 * this.frameX,
      56 * this.frameY,
      40,
      56,
      this.pos[0],
      this.pos[1],
      this.width,
      this.height
    );
  }
}

module.exports = Phoenix;
