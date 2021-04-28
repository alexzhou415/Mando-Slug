const Util = require("./util");
class MovingObject {

  constructor(options){
    this.game = options.game;
  }
  
  


  // draw(ctx, img, sx, sy, sw, sh, dx, dy, dw, dh) {
    
  //   ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh)
  //   ctx.fillStyle = "red";
  //   ctx.beginPath();
  //   ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
  //   ctx.fill();
  // }

  move(){
    // console.log(this.game.DIM_X);
    // console.log(Math.min(this.pos[0] + this.vel[0], this.game.DIM_X));
    this.pos = [Math.min(this.pos[0] + this.vel[0], this.game.DIM_X - this.width), 
    Math.min(this.pos[1] + this.vel[1], this.game.DIM_Y - this.height)];
    console.log(this.pos);
  } 

  collideWith(otherObject){

  }

  isCollidedWith(otherObject){
    const centerDist = Util.dist(this.pos, otherObject.pos);
    return centerDist < (Math.max(this.height/2, this.width/2) + Math.max(otherObject.height/2, otherObject.width/2));
  }
}

module.exports = MovingObject;