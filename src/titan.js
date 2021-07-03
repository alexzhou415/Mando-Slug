const Enemy = require("./enemy");

class Titan extends Enemy {
  constructor(options) {
    super(options);
    this.width = 80;
    this.height = 80;
    this.pos = options.pos;
    this.vel = 13;
    this.dir = options.dir;
    this.frameY = options.frameY;
    this.titanSprite = new Image();
    this.titanSprite.src = "./src/sprites/ifrit.png";
  }

  draw(ctx) {
    ctx.drawImage(
      this.titanSprite,
      80 * this.frameX,
      80 * this.frameY,
      80,
      80,
      this.pos[0],
      this.pos[1],
      this.width,
      this.height
    );
  }
}

module.exports = Titan;