const Hero = require("./hero");
const Enemy = require("./enemy");
const Bullet = require("./bullet");
const Titan = require("./titan");
const Phoenix = require("./phoenix");
const PhoenixBlast = require("./phoenix_blast");
const Bahamut = require("./bahamut");
class Game {
  constructor() {
    this.killCount = 0;
    this.numSpawned = 0;
    this.enemies = [];
    this.hero = [];
    this.bosses = [];
    this.bullets = [];
    this.blasts = []
    this.DIM_X = 800;
    this.DIM_Y = 500;
    this.NUM_ENEMIES = 3;
    this.NUM_BOSSES = 1;
    this.background = new Image();
    this.background.src = "./src/sprites/space-game-background.jpeg";
    this.won = false;
    this.lost = false;
  }

  addEnemies() {
    if (!this.won && !this.lost){
      
      if (this.killCount <= 40) {
        // console.log(this.hero[0].health);
        let currentEnemies = this.enemies.length;
        
        for (let i = currentEnemies; i < this.NUM_ENEMIES; i++) {
          if (this.numSpawned % 2 === 0) {
            // this.enemies.push(new Phoenix({ game: this, frameY: 1, dir: 'left', pos: [this.DIM_X - 96, 0] }));
            this.enemies.push(new Titan({ game: this, frameY: 1, dir: 'left', pos: [this.DIM_X - 80, this.DIM_Y - 80] }));
            this.numSpawned++;
            // console.log(i);
          } 
          if (this.numSpawned % 5 === 0) {
            this.enemies.push(new Phoenix({ game: this, frameY: 1, dir: 'left', pos: [this.DIM_X - 96, 0] }));
            // setInterval(this.enemies[this.enemies.length-1].shoot(), 5000);
            // console.log(this.enemies[this.enemies.length - 1]);
            // this.enemies[this.enemies.length - 1].shoot();
            this.numSpawned++;
          } else {
            this.enemies.push(new Titan({ game: this, frameY: 2, dir: 'right', pos: [0, this.DIM_Y - 72] }));
            this.numSpawned++;
          }
          
        }
      } else {
        let currentBosses = this.bosses.length;
        // this.enemies = [];
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

  addBlast (blast) {
    this.blasts.push(blast);
  }

  remove(object) {
    if (object instanceof Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object instanceof Titan) {
      this.enemies.splice(this.enemies.indexOf(object), 1);
    } else if (object instanceof Phoenix) {
      this.enemies.splice(this.enemies.indexOf(object), 1);
    } else if (object instanceof PhoenixBlast) {
      this.blasts.splice(this.blasts.indexOf(object), 1);
    } else if (object instanceof Bahamut) {
      this.bosses.splice(this.bosses.indexOf(object), 1);
    } else if (object instanceof Hero) {
      this.hero.splice(this.hero.indexOf(object), 1);
    } else {
      throw new Error("unknown type of object");
    }

  }


  allObjects() {
    return [].concat(this.hero, this.enemies, this.bosses, this.bullets, this.blasts);
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    ctx.drawImage(this.background, 0, 0, this.DIM_X, this.DIM_Y);
    this.allObjects().forEach((object) => object.draw(ctx));
  }

  moveObjects(delta) {
    this.allObjects().forEach((object) => {
      object.move(delta);
      if (object instanceof Bullet && (object.pos[0] < 0 || object.pos[0] > this.DIM_X || object.pos[1] <= 0)) this.remove(object)
      if (object instanceof PhoenixBlast && object.pos[1] >= this.DIM_Y) this.remove(object);
      if (object instanceof Phoenix) {
              if (object.pos[0] > this.hero[0].pos[0] - 10 && object.pos[0] < this.hero[0].pos[0] + 10 && object.ready) {
                object.shoot();
                object.ready = false;
              }
              if (object.pos[0] < 10) {
                object.dir = "right";
                object.frameY = 2;
                object.ready = true;
              }
              
              else if (object.pos[0] > this.DIM_X - 100) {
                object.dir = "left";
                object.frameY = 1;
                object.ready = true;
              } 
      } 
      if (object instanceof Bahamut) {
        if (object.dir === "right") {
          // object.dir = "right";
          object.frameY = 2;

        } else if (object.dir === "left") {
          // object.dir = "left";
          object.frameY = 1;

        } 
      }
    });
  }

  checkCollisions() {
    const allObjects = this.allObjects();
    for (let i = 0; i < allObjects.length; i++) {
      for (let j = 0; j < allObjects.length; j++) {
        const obj1 = allObjects[i];
        const obj2 = allObjects[j];
        if (i !== j && obj1.constructor.name !== obj2.constructor.name) {
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
      
      if (object instanceof Bahamut) {
        if (object.falling) return;
      }

      if (object.frameX < 3 && object.moving) object.frameX += 1;
      else object.frameX = 0;
      // if (object.frameX < 3 && object.moving) object.frameX += 1;
      // else object.frameX = 0;
      
    });
  }

  gameOver(){
    if (this.won) {
      const winScreen = document.getElementsByClassName("win-screen")[0];
      winScreen.classList.remove("hidden");
      
      // const canvas = document.getElementById("game-canvas");
      // canvas.classList.add("hidden");
    }

    if (this.lost) {
      // console.log('LOST');
      const loseScreen = document.getElementsByClassName("lose-screen")[0]
      loseScreen.classList.remove("hidden");

      // const canvas = document.getElementById("game-canvas");
      // canvas.classList.add("hidden");
    }
  }

  restart(){
    
  }

  step(delta) {
    if (this.won || this.lost) return;
    this.moveObjects(delta);
    this.checkCollisions();
    this.gameOver();
    this.handleObjectFrame();
    this.addEnemies();
    
  }
}

module.exports = Game;