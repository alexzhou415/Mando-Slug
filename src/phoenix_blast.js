const MovingObject = require("./moving_object");
const Hero = require("./hero");
const Util = require("./util");

class PhoenixBlast extends MovingObject {
  constructor(options) {
    super(options);
    this.pos = options.pos;
    // this.dir = options.dir;
    this.vel = 10;
    this.width = 20;
    this.up = options.up;
  }

  move() {
    this.pos = [this.pos[0], this.pos[1] + this.vel];

    // if (this.up) this.pos = [this.pos[0], this.pos[1] - this.vel];
    // else {
    //   switch (this.dir) {
    //     case "right":
    //       this.pos = [this.pos[0] + this.vel, this.pos[1]];
    //       break;
    //     case "left":
    //       this.pos = [this.pos[0] - this.vel, this.pos[1]];
    //       break;
    //     default:
    //   }
    // }
  }

  draw(ctx) {
    ctx.fillStyle = "orange";

    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.width, 0, 2 * Math.PI, true);
    ctx.fill();
  }

  isCollidedWith(otherObject) {
    let centerDist;

    if (otherObject instanceof Hero)
      centerDist = Util.dist(
        [otherObject.pos[0] + otherObject.width / 2, otherObject.pos[1] + otherObject.height / 2],
        this.pos
      );
    else centerDist = Util.dist(this.pos, otherObject.pos);
    return centerDist < this.width / 2 + otherObject.height / 2;
  }

  collideWith(otherObject) {
    if (otherObject instanceof Hero) {
      otherObject.loseHealth();
      this.remove();
      return otherObject.health;
    } 
    // else if (otherObject instanceof Bullet) {
    //   this.remove();
    //   this.game.killCount++;
    //   otherObject.remove();
    //   return true;
    // }
    return false;
  }
}

module.exports = PhoenixBlast;
