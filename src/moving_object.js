class MovingObject {

  constructor(options){
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = 50;
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
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
  } 
}

// MovingObject.prototype.draw = function 

// MovingObject.prototype.move = function 

module.exports = MovingObject;