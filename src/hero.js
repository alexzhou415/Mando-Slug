// const mando = require('./sprites/mandalorian2.png')

const MovingObject = require("./moving_object");

class Hero extends MovingObject{

  constructor(options){
    super(options);
    this.health = 3;
    this.vel = [100,0];
    this.width = 48;
    this.height = 72;
    this.pos = [this.game.DIM_X / 3, this.game.DIM_Y - this.height];
  }

  draw(ctx) {
    const heroSprite = new Image();
    heroSprite.src = "../src/sprites/mandalorian2.png";
    heroSprite.onload = () => {ctx.drawImage(heroSprite, 0, 0, 32, 48, this.pos[0], this.pos[1], this.width, this.height);}
    
    console.log("drawing");
  }

}

module.exports = Hero;