const Util = require("./util");
class MovingObject {

  constructor(options){
    this.game = options.game;
  }

  move(delta){
    let dir = 1;
    if (this.dir === "left") dir = -1;
    const divider = 1000 / 7;
    const velX = this.vel * (delta / divider);
    const dest = this.pos[0] + velX * dir;
    
    if (dest <= this.game.DIM_X - this.width && dest >= 0) {
      this.pos[0] = this.pos[0] + velX * dir;
    }
  } 

  remove(){
    this.game.remove(this);
  }

  collideWith(otherObject){

  }

  isCollidedWith(otherObject){
  }
}

module.exports = MovingObject;