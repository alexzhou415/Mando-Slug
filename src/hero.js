// const mando = require('./sprites/mandalorian2.png')

const MovingObject = require("./moving_object");

class Hero extends MovingObject{

  constructor(options){
    super(options);
  }

  draw(ctx) {
    const heroSprite = new Image();
    heroSprite.src = "../src/sprites/mandalorian2.png";
    heroSprite.onload = () => {ctx.drawImage(heroSprite, 0, 0, 32, 48, 200, 120, 32, 48);}
    
    console.log("drawing");
  }

}

module.exports = Hero;