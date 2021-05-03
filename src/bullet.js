const MovingObject = require("./moving_object");

class Bullet extends MovingObject {
  constructor(options){
    super(options);
    this.pos = options.pos;
    this.dir = options.dir;
    this.vel = 50;
    this.width = 4;
    this.up = options.up;
  }

  move(){
    

    if (this.up) this.pos = [this.pos[0], this.pos[1] - this.vel];
    else{
      switch (this.dir) {
        case "right":
          this.pos = [this.pos[0] + this.vel, this.pos[1]];
          break;
        case "left":
          this.pos = [this.pos[0] - this.vel, this.pos[1]];
          break;
        default:
      }
    }
    
  }

  draw(ctx) {
    ctx.fillStyle = "red";

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.width, 0, 2 * Math.PI, true
    );
    ctx.fill();
  };
}

module.exports = Bullet;