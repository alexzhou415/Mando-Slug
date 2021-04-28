const MovingObject = require("./moving_object");

class Enemy extends MovingObject{

  constructor(options){
    super(options);
  }

  draw(ctx){
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
    ctx.fill();
  }
}

module.exports = Enemy;