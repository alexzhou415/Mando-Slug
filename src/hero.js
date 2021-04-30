// const mando = require('../src/sprites/mandalorian2.png')

const MovingObject = require("./moving_object");
const Bullet = require("./bullet");

class Hero extends MovingObject{

  constructor(options){
    super(options);
    this.health = 3;
    this.vel = 0;
    this.width = 48;
    this.height = 72;
    this.frameX = 0;
    this.frameY = 2;
    this.dir = "right"
    this.pos = [this.game.DIM_X / 3, this.game.DIM_Y - this.height];
    this.alive = true;
    this.moving = false;
  }

  draw(ctx) {
    const heroSprite = new Image();
    heroSprite.src = "../src/sprites/mandalorian2.png";
    heroSprite.onload = () => {ctx.drawImage(heroSprite, 32 * this.frameX, 48 * this.frameY, 32, 48, this.pos[0], this.pos[1], this.width, this.height);}
    
    console.log("drawing");
  }

  loseHealth(){
    this.health -= 1;
    if (this.health === 0) this.alive = false;
  }

  shoot(){
    const bullet = new Bullet({game: this.game, pos: this.pos, dir: this.dir})
    this.game.addBullet(bullet);
  }

  // move(){

  // }
}

module.exports = Hero;