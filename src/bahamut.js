const Enemy = require("./enemy");
const Hero = require("./hero");
const Bullet = require("./bullet");

class Bahamut extends Enemy {
  constructor(options) {
    super(options);
    this.vel = 20;
    this.health = 15;
    this.alive = true;
    this.width = 96 * 1.5;
    this.height = 96 * 1.5;
    this.pos = [this.game.DIM_X - this.width, this.game.DIM_Y - this.height];
    this.bahamutSprite = new Image();
    this.bahamutSprite.src = "../src/sprites/bahamut.png";
  }

  draw(ctx) {
    ctx.drawImage(
      this.bahamutSprite,
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

  loseHealth() {
    this.health -= 1;
    if (this.health <= 0) this.alive = false;
  }

  collideWith(otherObject) {
    if (otherObject instanceof Hero) {
 
      otherObject.loseHealth();
      return true;
    } else if (otherObject instanceof Bullet) {
      this.loseHealth();
      if (!this.alive) {
        this.remove();
        this.game.won = true;
      }
      otherObject.remove();
      return true;
    }
    return false;
  }
}

module.exports = Bahamut;