
const MovingObject = require("./moving_object");
const Bullet = require("./bullet");

class Hero extends MovingObject{

  constructor(options){
    super(options);
    this.health = 5;
    this.vel = 0;
    this.width = 48;
    this.height = 72;
    this.frameX = 0;
    this.frameY = 2;
    this.dir = "right"
    this.up = false;
    this.pos = [this.game.DIM_X / 3, this.game.DIM_Y - this.height];
    this.alive = true;
    this.moving = false;
    this.heroSprite = new Image();
    this.heroSprite.src = "../src/sprites/mandalorian2.png";
    this.gunSpriteRight = new Image();
    this.gunSpriteRight.src = "../src/sprites/US.png";
    this.gunSpriteLeft = new Image();
    this.gunSpriteLeft.src = "../src/sprites/US-flipped.png";
    this.gunSpriteUpRight = new Image();
    this.gunSpriteUpRight.src = "../src/sprites/US-up.png";
    this.gunSpriteUpLeft = new Image();
    this.gunSpriteUpLeft.src = "../src/sprites/US-flipped-up.png";
  }

  draw(ctx) {
    ctx.drawImage(
      this.heroSprite,
      32 * this.frameX,
      48 * this.frameY,
      32,
      48,
      this.pos[0],
      this.pos[1],
      this.width,
      this.height
    );

    if (this.dir === "left" && !this.up){
      ctx.drawImage(
      this.gunSpriteLeft,
      64, 15, 32, 15, this.pos[0] - this.width/2 ,this.pos[1] + this.height/3, 64, 30
      )
    }

    if (this.dir === "right" && !this.up){
      ctx.drawImage(
      this.gunSpriteRight,
      0, 15, 32, 15, this.pos[0] + this.width/6,this.pos[1] + this.height/3, 64, 30
      )
    }

    if (this.dir === "right" && this.up){
      ctx.drawImage(
      this.gunSpriteUpRight,
      15, 64, 15, 32, this.pos[0] + this.width/6,this.pos[1], 30, 64
      )
    }

    if (this.dir === "left" && this.up){
      ctx.drawImage(
      this.gunSpriteUpLeft,
      60, 64, 15, 32, this.pos[0] + this.width/6,this.pos[1], 30, 64
      )
    }
    
  }

  loseHealth(){
    
    
    if (this.health > 0){
      const hearts = document.getElementsByClassName("heart");
      hearts[this.health - 1].classList.add("hidden");
    };
    
    this.health -= 1;
    
    if (this.health <= 0) {
      this.alive = false;
      this.game.lost = true;
    }
  }

  shoot(){
    const bullet = new Bullet({game: this.game, pos: [this.pos[0] + this.width/3, this.pos[1] + this.height/2], dir: this.dir, up: this.up})
    this.game.addBullet(bullet);

  }
}

module.exports = Hero;