const Hero = require("./hero");
const Enemy = require("./enemy");

class Game {
  constructor() {
    this.enemies = [];
    this.hero = [];
    this.DIM_X = 900;
    this.DIM_Y = 600;
    this.NUM_ENEMIES = 3;

    this.addEnemies();
  }

  addEnemies() {
    for (let i = 0; i < this.NUM_ENEMIES; i++) {
      this.enemies.push(new Enemy({ game: this }));
    }
  }

  addHero() {
    const hero = new Hero({ game: this });
    this.hero.push(hero);
  }

  allObjects() {
    return [].concat(this.hero, this.enemies);
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    // console.log(this.allObject)
    this.allObjects().forEach((object) => object.draw(ctx));
  }

  moveObjects() {
    console.log(this.allObjects());
    this.allObjects().forEach((object) => object.move());
  }
}

module.exports = Game;