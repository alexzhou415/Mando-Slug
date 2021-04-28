// const mando = require('./sprites/mandalorian2.png')

const MovingObject = require("./moving_object");

class Hero extends MovingObject{

  constructor(options){
    super(options);
  }

  draw(ctx) {
    const heroSprite = new Image();
    heroSprite.src =
      "https://untamed.wild-refuge.net/images/rpgxp/mandalorian2.png";

    ctx.drawImage(heroSprite, 0, 0, 32, 48, 0, 0, 48, 72);
    console.log("drawing");
  }

}

module.exports = Hero;