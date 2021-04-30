const Util = require("./util");
class MovingObject {

  constructor(options){
    this.game = options.game;
  }

  move(delta){
    let dir = 1;
    if (this.dir === "left") dir = -1;
    // delta ||= 1;
    const divider = 1000 / 7;
    const velX = this.vel * (delta / divider);
    const dest = this.pos[0] + velX * dir;
    
    if (dest <= this.game.DIM_X - this.width && dest >= 0) {
      this.pos[0] = this.pos[0] + velX * dir;
    }
    // console.log(this.pos);
  } 

  remove(){
    this.game.remove(this);
  }

  collideWith(otherObject){

  }

  isCollidedWith(otherObject){
    // let centerDist;
    //fix hitbox
    // if (this instanceof Enemy) centerDist = Util.dist([this.pos[0] + this.width/2, this.pos[1] + this.height/2], otherObject.pos);
    // else centerDist = Util.dist(this.pos, otherObject.pos);
    // console.log("in iscolliedwith");
    // console.log(centerDist < this.width / 4 + otherObject.width / 4);
    // console.log(centerDist);
    // console.log(this.width /  + otherObject.width / 2);
    // return (
    //   centerDist < (this.width / 2 + otherObject.width / 2)
    // );
    // return centerDist < (Math.min(this.height/2, this.width/2) + Math.min(otherObject.height/2, otherObject.width/2));
  }
}

module.exports = MovingObject;