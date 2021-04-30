const MovingObject = require("./moving_object");
const Hero = require("./hero");
const Bullet = require("./bullet");
class Enemy extends MovingObject{

  constructor(options){
    super(options);
    this.vel = -10;
    this.width = 48;
    this.height = 72;
    this.frameX = 0;
    this.frameY = 1;
    this.pos = [this.game.DIM_X - this.width, this.game.DIM_Y - this.height];
    this.moving = true;
  }

  draw(ctx){
    const enemySprite = new Image();
    enemySprite.src = "../src/sprites/titan.png";
    enemySprite.onload = () => {
    ctx.drawImage(enemySprite, 40 * this.frameX, 56 * this.frameY, 40, 56, this.pos[0], this.pos[1], this.width, this.height);
   };
  }

  collideWith(otherObject){
    if (otherObject instanceof Hero) {
      // console.log("collision");
      // otherObject.loseHealth();
      otherObject.remove();
      return true;
    } else if (otherObject instanceof Bullet) {
      this.remove();
      otherObject.remove();
      return true;
    }
    return false;
  }
}

module.exports = Enemy;