const MovingObject = require("./moving_object");
const Hero = require("./hero");
const Bullet = require("./bullet");
const Util = require("./util");
class Enemy extends MovingObject {
  constructor(options) {
    super(options);
    this.vel = 5;
    this.dir = "left";
    this.frameX = 0;
    this.frameY = 1;
    this.pos = [this.game.DIM_X - this.width, this.game.DIM_Y - this.height];
    this.moving = true;
    this.enemySprite = new Image();
    this.enemySprite.src = "../src/sprites/titan.png";
  }

  draw(ctx) {
    //   const enemySprite = new Image();

    //   enemySprite.onload = () => {
    //   ctx.drawImage(enemySprite, 40 * this.frameX, 56 * this.frameY, 40, 56, this.pos[0], this.pos[1], this.width, this.height);
    //  };
    //   enemySprite.src = "../src/sprites/titan.png";
    ctx.drawImage(
      this.enemySprite,
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

  isCollidedWith(otherObject) {
    let centerDist;
    //fix hitbox
    if (otherObject instanceof Bullet)
      centerDist = Util.dist(
        [this.pos[0] + this.width / 2, this.pos[1] + this.height / 2],
        otherObject.pos
      );
    else centerDist = Util.dist(this.pos, otherObject.pos);
    return centerDist < this.width / 2 + otherObject.width / 2;
    // return centerDist < (Math.min(this.height/2, this.width/2) + Math.min(otherObject.height/2, otherObject.width/2));
  }

  collideWith(otherObject) {
    if (otherObject instanceof Hero) {
      console.log("collision");
      otherObject.loseHealth();
      console.log(otherObject.health);
      return otherObject.health;
    } else if (otherObject instanceof Bullet) {
      console.log("hit");
      this.remove();
      this.game.killCount++;
      console.log(this.game.killCount);
      otherObject.remove();
      return true;
    }
    return false;
  }
}

module.exports = Enemy;