const Hero = require("./hero");
const Enemy = require("./enemy");
const Bullet = require("./bullet");
const Titan = require("./titan");
const Bahamut = require("./bahamut");
class Game {
  constructor() {
    this.killCount = 0;
    this.numSpawned = 0;
    this.enemies = [];
    this.hero = [];
    this.bosses = [];
    this.bullets = [];
    this.DIM_X = 800;
    this.DIM_Y = 500;
    this.NUM_ENEMIES = 3;
    this.NUM_BOSSES = 1;
    this.background = new Image();
    this.background.src = "../src/sprites/space-game-background.jpeg";
    this.won = false;
    this.lost = false;
  }

  addEnemies() {
    if (!this.won && !this.lost){
      
      if (this.killCount <= 20) {
        let currentEnemies = this.enemies.length;
        // pos = [this.game.DIM_X - this.width, this.game.DIM_Y - this.height];
        
        for (let i = currentEnemies; i < this.NUM_ENEMIES; i++) {
          if (this.numSpawned % 2 === 0) {
            this.enemies.push(new Titan({ game: this, frameY: 1, dir: 'left', pos: [this.DIM_X - 48, this.DIM_Y - 72] }));
            this.numSpawned++;
          } else {
            this.enemies.push(new Titan({ game: this, frameY: 2, dir: 'right', pos: [0, this.DIM_Y - 72] }));
            this.numSpawned++;
          }
          
          console.log("spawning");
        }
      } else {
        let currentBosses = this.bosses.length;
        this.enemies = [];
        for (let i = currentBosses; i < this.NUM_BOSSES; i++){
          this.bosses.push(new Bahamut({ game: this }));
        }
        
      }
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
    } else if (object instanceof Titan) {
      this.enemies.splice(this.enemies.indexOf(object), 1);
    } else if (object instanceof Bahamut) {
      this.bosses.splice(this.bosses.indexOf(object), 1);
    } else if (object instanceof Hero) {
      this.hero.splice(this.hero.indexOf(object), 1);
    } else {
      throw new Error("unknown type of object");
    }

    console.log(object);
  }


  allObjects() {
    return [].concat(this.hero, this.enemies, this.bosses, this.bullets);
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    ctx.drawImage(this.background, 0, 0, this.DIM_X, this.DIM_Y);
    this.allObjects().forEach((object) => object.draw(ctx));
  }

  moveObjects(delta) {
    this.allObjects().forEach((object) => {
      // console.log(this.hero[0].pos[0]);
      // console.log(object instanceof Enemy);
      // if (this.hero[0].pos[0] <= object.pos[0] && object instanceof Enemy) object.dir = "left";
      // else if (this.hero[0].pos[0] > object.pos[0] && object instanceof Enemy) object.dir = "right"
      object.move(delta);
      if (object instanceof Bullet && (object.pos[0] < 0 || object.pos[0] > this.DIM_X || object.pos[1] <= 0)) this.remove(object)
    });
    // console.log(this.allObjects());
  }

  checkCollisions() {
    const allObjects = this.allObjects();
    for (let i = 0; i < allObjects.length; i++) {
      for (let j = 0; j < allObjects.length; j++) {
        const obj1 = allObjects[i];
        const obj2 = allObjects[j];
        // console.log(obj1.constructor.name);
        // console.log(typeof obj2);
        if (i !== j && obj1.constructor.name !== obj2.constructor.name) {
          // console.log(obj1);
          // console.log(obj2);
          if (obj1.isCollidedWith(obj2)) {
            // console.log(obj1);
            // console.log(obj2);
            // console.log("hit");
            const collision = obj1.collideWith(obj2);
            if (collision) return;
          }
        }
      }
    }
  }

  handleObjectFrame() {
    this.allObjects().forEach((object) => {
      // console.log(object.frameX);
      if (object.frameX < 3 && object.moving) object.frameX += 1;
      else object.frameX = 0;
    });
  }

  gameOver(){
    if (this.won) {
      const winScreen = document.getElementsByClassName("win-screen")[0];
      winScreen.classList.remove("hidden");
    }

    if (this.lost) {
      const loseScreen = document.getElementsByClassName("lose-screen")[0]
      loseScreen.classList.remove("hidden");
    }
  }

  restart(){
    
  }

  step(delta) {
    
    this.moveObjects(delta);
    this.checkCollisions();
    this.gameOver();
    this.handleObjectFrame();
    this.addEnemies();
    
    // console.log(this.allObjects());
  }
}

module.exports = Game;