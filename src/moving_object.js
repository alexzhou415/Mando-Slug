const Util = require("./util");
class MovingObject {

  constructor(options){
    this.game = options.game;
  }

  move(){
    const dest = this.pos[0] + this.vel;
    if (dest <= this.game.DIM_X - this.width && dest >= 0) {
      this.pos[0] = this.pos[0] + this.vel;
    }
  } 

  remove(){
    this.game.remove(this);
  }

  collideWith(otherObject){

  }

  isCollidedWith(otherObject){

    //fix hitbox
    const centerDist = Util.dist(this.pos, otherObject.pos);
    return centerDist < (Math.min(this.height/2, this.width/2) + Math.min(otherObject.height/2, otherObject.width/2));
  }
}

module.exports = MovingObject;