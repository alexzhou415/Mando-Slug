const Enemy = require("./enemy");
const Hero = require("./hero");
const Bullet = require("./bullet");

class Bahamut extends Enemy {
  constructor(options) {
    super(options);
    this.vel = 18;
    this.health = 40;
    this.alive = true;
    this.width = 96 * 1.5;
    this.height = 96 * 1.5;
    this.grounded = true;
    this.falling = false;
    this.dmg = false;
    this.heroPos = 0;
    this.pos = [this.game.DIM_X - this.width + 1, this.game.DIM_Y - this.height];
    this.bahamutSprite = new Image();
    this.bahamutSprite.src = "../src/sprites/bahamut.png";
  }

  draw(ctx) {
    ctx.drawImage(
      this.bahamutSprite,
      96 * this.frameX,
      96 * this.frameY,
      96,
      96,
      this.pos[0],
      this.pos[1],
      this.width,
      this.height
    );
  }

  move(delta) {
    if (this.grounded) {
      this.heroPos = this.game.hero[0].pos[0];
      // console.log(this.heroPos + this.pos + this.game.hero.pos);
      // console.log(this.game)
      // console.log(this.pos[0]);
      // console.log(this.heroPos);
      if (this.pos[0] - this.heroPos > 0) this.dir = "left";
      else this.dir = "right";
      this.grounded = false;
    }
    // let dirX = 1;
    else {
    let dirY = -1;
    if (this.falling) dirY = 1;
    let dirX;
    if (this.dir === "left") dirX = -1;
    else dirX = 1;
    const divider = 1000 / 7;
    const velX = this.vel * (delta / divider);
    const destX = this.pos[0] + velX * dirX;
    // const destY = this.pos[1] + velX * dirY;
    // console.log();
    // console.log(this.grounded);
    // console.log("adsfsas");
    // console.log(destX);
    // console.log(this.game.DIM_X - this.width);
    // console.log(this.game.DIM_X)
    // console.log(this.pos[0]);
    // console.log(this.dir);
    // console.log(velX);
    if (destX <= this.game.DIM_X - this.width && destX >= 0 ) {
      if (this.heroPos - this.pos[0] >= -50 && this.heroPos - this.pos[0] <= 50 ){
        this.pos[0] = this.heroPos - 48;
        this.falling = true;
        console.log("spgaht4ti");
      }
      
      else this.pos[0] = this.pos[0] + velX * dirX;
      console.log(destX);
    }

    if ((this.pos[0] - this.heroPos >= -50 || this.pos[0] - this.heroPos <= 50) && this.falling) {

      // this.pos[1] = this.pos[1] + velX * dirY;
      if (this.pos[1] + velX * dirY >= this.game.DIM_Y - this.height) {
        this.pos[1] = this.game.DIM_Y - this.height;
        this.falling = false;
        this.grounded = true;
      } 
      
      
    } 

    this.pos[1] = this.pos[1] + velX * dirY;

    // if (this.pos[1] >= this.game.DIM_Y - this.height) {
    //   this.grounded = true;
    //   this.falling = false;
    // }
  }

}

  loseHealth() {
    this.health -= 1;
    if (this.health <= 0) this.alive = false;
  }

  collideWith(otherObject) {
    if (otherObject instanceof Hero) {
      if (this.dmg) {
        otherObject.loseHealth();
        this.dmg = false;
      }

      else {
        if (this.falling) this.dmg = true;
      }
      
      return true;
    } else if (otherObject instanceof Bullet) {
      this.loseHealth();
      if (!this.alive) {
        this.remove();
        this.game.won = true;
      }
      otherObject.remove();
      return true;
    }
    return false;
  }
}

module.exports = Bahamut;