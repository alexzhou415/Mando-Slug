const MovingObject = require("./moving_object");

class Bullet extends MovingObject {
  constructor(options){
    super(options);
    this.pos = options.pos;
    this.dir = options.dir;
    this.vel = 100;
    this.radius = 3;
  }

  move(){
    switch (this.dir) {
      case "right": 
        this.pos = [this.pos[0] + this.vel, this.pos[1]];
      case "left":
        this.pos = [this.pos[0] - this.vel, this.pos[1]];
      case "up":
        this.pos = [this.pos[0], this.pos[1] - this.vel];
    }
  }

  draw(ctx) {
    ctx.fillStyle = "gray";

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
  };
}

module.exports = Bullet;