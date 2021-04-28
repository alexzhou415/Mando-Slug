const MovingObject = require("./moving_object");
const Hero = require("./hero");
const Bullet = require("./bullet");
class Enemy extends MovingObject{

  constructor(options){
    super(options);
    this.vel = [0,0];
    this.width = 48;
    this.height = 72;
    this.pos = [this.game.DIM_X - this.width, this.game.DIM_Y - this.height];
  }

  draw(ctx){
    const enemySprite = new Image();
    enemySprite.src = "../src/sprites/titan.png";
    enemySprite.onload = () => {
    ctx.drawImage(enemySprite, 0, 0, 40, 56, this.pos[0], this.pos[1], this.width, this.height);
   };
  }

  collideWith(otherObject){
    
  }
}

module.exports = Enemy;