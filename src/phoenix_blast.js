const MovingObject = require("./moving_object");

class PhoenixBlast extends MovingObject {
  constructor(options) {
    super(options);
    this.pos = options.pos;
    // this.dir = options.dir;
    this.vel = 60;
    this.width = 6;
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
}

module.exports = PhoenixBlast;
