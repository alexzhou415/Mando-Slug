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
    this.grounded = true;
    this.falling = false;
    this.heroPos = [];
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

  move(delta) {
    if (this.grounded) {
      this.heroPos = this.game.hero.pos;
      if (this.pos[0] - this.heroPos[0] > 0) this.dir = "left";
      else this.dir = "right";
      this.grounded = false;
    }
    // let dirX = 1;
    let dirY = -1;
    if (this.dir === "left") dirX = -1;
    else dirX = 1;
    const divider = 1000 / 7;
    const velX = this.vel * (delta / divider);
    const destX = this.pos[0] + velX * dirX;
    // const destY = this.pos[1] + velX * dirY;

    if (destX <= this.game.DIM_X - this.width && destX >= 0 && destX) {
      this.pos[0] = this.pos[0] + velX * dirX;
    }

    if ((this.pos[0] - this.heroPos[0] > -50 || this.pos[0] - this.heroPos[0] < 50) && this.falling) {
      this.pos[1] = this.pos[1] + velX * dirY;
    }

    if (this.pos[1] >= this.game.DIM_Y - this.height) {
      this.grounded = true;
      this.falling = false;
    }
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