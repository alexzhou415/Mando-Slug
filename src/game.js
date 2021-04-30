const Hero = require("./hero");
const Enemy = require("./enemy");
const Bullet = require("./bullet");

class Game {
  constructor() {
    this.enemies = [];
    this.hero = [];
    this.bullets = [];
    this.DIM_X = 800;
    this.DIM_Y = 500;
    this.NUM_ENEMIES = 3;

    this.addEnemies();
  }

  addEnemies() {
    let currentEnemies = this.enemies.length;
    for (let i = currentEnemies; i < this.NUM_ENEMIES; i++) {
      this.enemies.push(new Enemy({ game: this }));
    }
  }

  addHero() {
    const hero = new Hero({ game: this });
    this.hero.push(hero);

    return hero;
  }

  addBullet(bullet){
    this.bullets.push(bullet);
  }

  remove(object) {
    if (object instanceof Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object instanceof Enemy) {
      this.enemies.splice(this.enemies.indexOf(object), 1);
    } else if (object instanceof Hero) {
      this.hero.splice(this.hero.indexOf(object), 1);
    } else {
      throw new Error("unknown type of object");
    }
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
    this.allObjects().forEach((object) => object.move());
  }

  checkCollisions() {
    const allObjects = this.allObjects();
    for (let i = 0; i < allObjects.length; i++) {
      for (let j = 0; j < allObjects.length; j++) {
        if (i !== j) {
          const obj1 = allObjects[i];
          const obj2 = allObjects[j];

          if (obj1.isCollidedWith(obj2)) {
            const collision = obj1.collideWith(obj2);
            if (collision) return;
          }
        }
      }
    }
  }

  handleObjectFrame() {
    this.allObjects().forEach((object) => {
      console.log(object.frameX);
      if (object.frameX < 3 && object.moving) object.frameX += 1;
      else object.frameX = 0;
    });
  }

  step() {
    this.moveObjects();
    this.checkCollisions();
    this.handleObjectFrame();
  }
}

module.exports = Game;