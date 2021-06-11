/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/bahamut.js":
/*!************************!*\
  !*** ./src/bahamut.js ***!
  \************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Enemy = __webpack_require__(/*! ./enemy */ \"./src/enemy.js\");\nconst Hero = __webpack_require__(/*! ./hero */ \"./src/hero.js\");\nconst Bullet = __webpack_require__(/*! ./bullet */ \"./src/bullet.js\");\n\nclass Bahamut extends Enemy {\n  constructor(options) {\n    super(options);\n    this.vel = 20;\n    this.health = 15;\n    this.alive = true;\n    this.width = 96 * 1.5;\n    this.height = 96 * 1.5;\n    this.pos = [this.game.DIM_X - this.width, this.game.DIM_Y - this.height];\n    this.bahamutSprite = new Image();\n    this.bahamutSprite.src = \"../src/sprites/bahamut.png\";\n  }\n\n  draw(ctx) {\n    ctx.drawImage(\n      this.bahamutSprite,\n      96 * this.frameX,\n      96 * this.frameY,\n      96,\n      96,\n      this.pos[0],\n      this.pos[1],\n      this.width,\n      this.height\n    );\n  }\n\n  loseHealth() {\n    this.health -= 1;\n    if (this.health <= 0) this.alive = false;\n  }\n\n  collideWith(otherObject) {\n    if (otherObject instanceof Hero) {\n \n      otherObject.loseHealth();\n      return true;\n    } else if (otherObject instanceof Bullet) {\n      this.loseHealth();\n      if (!this.alive) {\n        this.remove();\n        this.game.won = true;\n      }\n      otherObject.remove();\n      return true;\n    }\n    return false;\n  }\n}\n\nmodule.exports = Bahamut;\n\n//# sourceURL=webpack:///./src/bahamut.js?");

/***/ }),

/***/ "./src/bullet.js":
/*!***********************!*\
  !*** ./src/bullet.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\n\nclass Bullet extends MovingObject {\n  constructor(options){\n    super(options);\n    this.pos = options.pos;\n    this.dir = options.dir;\n    this.vel = 50;\n    this.width = 4;\n    this.up = options.up;\n  }\n\n  move(){\n    \n\n    if (this.up) this.pos = [this.pos[0], this.pos[1] - this.vel];\n    else{\n      switch (this.dir) {\n        case \"right\":\n          this.pos = [this.pos[0] + this.vel, this.pos[1]];\n          break;\n        case \"left\":\n          this.pos = [this.pos[0] - this.vel, this.pos[1]];\n          break;\n        default:\n      }\n    }\n    \n  }\n\n  draw(ctx) {\n    ctx.fillStyle = \"red\";\n\n    ctx.beginPath();\n    ctx.arc(\n      this.pos[0], this.pos[1], this.width, 0, 2 * Math.PI, true\n    );\n    ctx.fill();\n  };\n}\n\nmodule.exports = Bullet;\n\n//# sourceURL=webpack:///./src/bullet.js?");

/***/ }),

/***/ "./src/enemy.js":
/*!**********************!*\
  !*** ./src/enemy.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Hero = __webpack_require__(/*! ./hero */ \"./src/hero.js\");\nconst Bullet = __webpack_require__(/*! ./bullet */ \"./src/bullet.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nclass Enemy extends MovingObject {\n  constructor(options) {\n    super(options);\n    this.vel = 5;\n    this.dir = \"left\";\n    this.frameX = 0;\n    this.frameY = 1;\n    this.pos = [this.game.DIM_X - this.width, this.game.DIM_Y - this.height];\n    this.moving = true;\n    this.enemySprite = new Image();\n    this.enemySprite.src = \"../src/sprites/titan.png\";\n  }\n\n  draw(ctx) {\n    ctx.drawImage(\n      this.enemySprite,\n      40 * this.frameX,\n      56 * this.frameY,\n      40,\n      56,\n      this.pos[0],\n      this.pos[1],\n      this.width,\n      this.height\n    );\n  }\n\n  isCollidedWith(otherObject) {\n    let centerDist;\n\n    if (otherObject instanceof Bullet)\n      centerDist = Util.dist(\n        [this.pos[0] + this.width / 2, this.pos[1] + this.height / 2],\n        otherObject.pos\n      );\n    else centerDist = Util.dist(this.pos, otherObject.pos);\n    return centerDist < this.width / 2 + otherObject.width / 2;\n  }\n\n  collideWith(otherObject) {\n    if (otherObject instanceof Hero) {\n      otherObject.loseHealth();\n      this.remove();\n      return otherObject.health;\n    } else if (otherObject instanceof Bullet) {\n      this.remove();\n      this.game.killCount++;\n      otherObject.remove();\n      return true;\n    }\n    return false;\n  }\n}\n\nmodule.exports = Enemy;\n\n//# sourceURL=webpack:///./src/enemy.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Hero = __webpack_require__(/*! ./hero */ \"./src/hero.js\");\nconst Enemy = __webpack_require__(/*! ./enemy */ \"./src/enemy.js\");\nconst Bullet = __webpack_require__(/*! ./bullet */ \"./src/bullet.js\");\nconst Titan = __webpack_require__(/*! ./titan */ \"./src/titan.js\");\nconst Phoenix = __webpack_require__(/*! ./phoenix */ \"./src/phoenix.js\");\nconst PhoenixBlast = __webpack_require__(/*! ./phoenix_blast */ \"./src/phoenix_blast.js\");\nconst Bahamut = __webpack_require__(/*! ./bahamut */ \"./src/bahamut.js\");\nclass Game {\n  constructor() {\n    this.killCount = 0;\n    this.numSpawned = 0;\n    this.enemies = [];\n    this.hero = [];\n    this.bosses = [];\n    this.bullets = [];\n    this.blasts = []\n    this.DIM_X = 800;\n    this.DIM_Y = 500;\n    this.NUM_ENEMIES = 4;\n    this.NUM_BOSSES = 1;\n    this.background = new Image();\n    this.background.src = \"../src/sprites/space-game-background.jpeg\";\n    this.won = false;\n    this.lost = false;\n  }\n\n  addEnemies() {\n    if (!this.won && !this.lost){\n      \n      if (this.killCount <= 40) {\n        let currentEnemies = this.enemies.length;\n        \n        for (let i = currentEnemies; i < this.NUM_ENEMIES; i++) {\n          if (this.numSpawned % 2 === 0) {\n            // this.enemies.push(new Phoenix({ game: this, frameY: 1, dir: 'left', pos: [this.DIM_X - 96, 0] }));\n            this.enemies.push(new Titan({ game: this, frameY: 1, dir: 'left', pos: [this.DIM_X - 48, this.DIM_Y - 72] }));\n            this.numSpawned++;\n            // console.log(i);\n          } \n          if (this.numSpawned % 5 === 0) {\n            this.enemies.push(new Phoenix({ game: this, frameY: 1, dir: 'left', pos: [this.DIM_X - 96, 0] }));\n            // setInterval(this.enemies[this.enemies.length-1].shoot(), 5000);\n            // console.log(this.enemies[this.enemies.length - 1]);\n            // this.enemies[this.enemies.length - 1].shoot();\n            this.numSpawned++;\n          } else {\n            this.enemies.push(new Titan({ game: this, frameY: 2, dir: 'right', pos: [0, this.DIM_Y - 72] }));\n            this.numSpawned++;\n          }\n          \n        }\n      } else {\n        let currentBosses = this.bosses.length;\n        this.enemies = [];\n        for (let i = currentBosses; i < this.NUM_BOSSES; i++){\n          this.bosses.push(new Bahamut({ game: this }));\n        }\n        \n      }\n    }\n  }\n\n  addHero() {\n    const hero = new Hero({ game: this });\n    this.hero.push(hero);\n\n    return hero;\n  }\n\n  addBullet(bullet){\n    this.bullets.push(bullet);\n    \n  }\n\n  addBlast (blast) {\n    this.blasts.push(blast);\n  }\n\n  remove(object) {\n    if (object instanceof Bullet) {\n      this.bullets.splice(this.bullets.indexOf(object), 1);\n    } else if (object instanceof Titan) {\n      this.enemies.splice(this.enemies.indexOf(object), 1);\n    } else if (object instanceof Phoenix) {\n      this.enemies.splice(this.enemies.indexOf(object), 1);\n    } else if (object instanceof PhoenixBlast) {\n      this.blasts.splice(this.blasts.indexOf(object), 1);\n    } else if (object instanceof Bahamut) {\n      this.bosses.splice(this.bosses.indexOf(object), 1);\n    } else if (object instanceof Hero) {\n      this.hero.splice(this.hero.indexOf(object), 1);\n    } else {\n      throw new Error(\"unknown type of object\");\n    }\n\n  }\n\n\n  allObjects() {\n    return [].concat(this.hero, this.enemies, this.bosses, this.bullets, this.blasts);\n  }\n\n  draw(ctx) {\n    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);\n    ctx.drawImage(this.background, 0, 0, this.DIM_X, this.DIM_Y);\n    this.allObjects().forEach((object) => object.draw(ctx));\n  }\n\n  moveObjects(delta) {\n    this.allObjects().forEach((object) => {\n      object.move(delta);\n      if (object instanceof Bullet && (object.pos[0] < 0 || object.pos[0] > this.DIM_X || object.pos[1] <= 0)) this.remove(object)\n      if (object instanceof PhoenixBlast && object.pos[1] >= this.DIM_Y) this.remove(object);\n      if (object instanceof Phoenix) {\n              if (object.pos[0] > this.hero[0].pos[0] - 10 && object.pos[0] < this.hero[0].pos[0] + 10 && object.ready) {\n                object.shoot();\n                object.ready = false;\n              }\n              if (object.pos[0] < 10) {\n                object.dir = \"right\";\n                object.frameY = 2;\n                object.ready = true;\n              }\n              \n              else if (object.pos[0] > this.DIM_X - 100) {\n                object.dir = \"left\";\n                object.frameY = 1;\n                object.ready = true;\n              } \n      }\n    });\n  }\n\n  checkCollisions() {\n    const allObjects = this.allObjects();\n    for (let i = 0; i < allObjects.length; i++) {\n      for (let j = 0; j < allObjects.length; j++) {\n        const obj1 = allObjects[i];\n        const obj2 = allObjects[j];\n        if (i !== j && obj1.constructor.name !== obj2.constructor.name) {\n          if (obj1.isCollidedWith(obj2)) {\n\n            const collision = obj1.collideWith(obj2);\n            if (collision) return;\n          }\n        }\n      }\n    }\n  }\n\n  handleObjectFrame() {\n    this.allObjects().forEach((object) => {\n      if (object.frameX < 3 && object.moving) object.frameX += 1;\n      else object.frameX = 0;\n    });\n  }\n\n  gameOver(){\n    if (this.won) {\n      const winScreen = document.getElementsByClassName(\"win-screen\")[0];\n      winScreen.classList.remove(\"hidden\");\n    }\n\n    if (this.lost) {\n      const loseScreen = document.getElementsByClassName(\"lose-screen\")[0]\n      loseScreen.classList.remove(\"hidden\");\n    }\n  }\n\n  restart(){\n    \n  }\n\n  step(delta) {\n    \n    this.moveObjects(delta);\n    this.checkCollisions();\n    this.gameOver();\n    this.handleObjectFrame();\n    this.addEnemies();\n    \n  }\n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/***/ ((module) => {

eval("\nclass GameView {\n  constructor(game, ctx) {\n    this.game = game;\n    this.hero = this.game.addHero();\n    this.ctx = ctx;\n  }\n\n  keydownFunc(e){\n    keys[e.key] = true;\n\n    if (keys[\"w\"]) {\n      that.hero.up = true;\n    }\n    if (keys[\"a\"] && that.hero.pos[0] > 0) {\n      that.hero.moving = true;\n      that.hero.vel = 20;\n      that.hero.frameY = 1;\n      that.hero.dir = \"left\";\n    }\n    if (keys[\"d\"] && that.hero.pos[0] < that.game.DIM_X - that.hero.width) {\n      that.hero.moving = true;\n      that.hero.vel = 20;\n      that.hero.frameY = 2;\n      that.hero.dir = \"right\";\n    }\n\n    if (keys[\" \"]) {\n      that.hero.shoot();\n    }\n  }\n\n  bindKeyHandlers() {\n    const keys = [];\n    let that = this;\n    document.addEventListener(\"keydown\", function (e) {\n      keys[e.key] = true;\n      if (keys[\"w\"]) {\n        that.hero.up = true;\n      }\n      if (keys[\"a\"] && that.hero.pos[0] > 0) {\n        that.hero.moving = true;\n        that.hero.vel = 20;\n        that.hero.frameY = 1;\n        that.hero.dir = \"left\";\n      }\n      if (keys[\"d\"] && that.hero.pos[0] < that.game.DIM_X - that.hero.width) {\n        that.hero.moving = true;\n        that.hero.vel = 20;\n        that.hero.frameY = 2;\n        that.hero.dir = \"right\";\n      }\n\n      if (keys[\" \"]) {\n        that.hero.shoot();\n      }\n    });\n\n    document.addEventListener(\"keyup\", function (e) {\n      if (keys[\"a\"] || keys[\"d\"]){\n        that.hero.vel = 0;\n        that.hero.moving = false;\n      }\n\n      if (keys[\"w\"]) that.hero.up = false;\n      delete keys[e.key];\n    });\n  }\n\n  start() {\n    this.bindKeyHandlers();\n    this.lastTime = Date.now();\n    this.fpsInterval = 1000/10;\n    requestAnimationFrame(this.animate.bind(this));\n  }\n\n  animate(time) {\n    this.now = Date.now();\n    const delta = this.now - this.lastTime;\n    if (delta > this.fpsInterval){\n      this.lastTime = this.now - (delta % this.fpsInterval);\n      this.game.step(delta);\n      this.game.draw(this.ctx);\n    }\n\n    requestAnimationFrame(this.animate.bind(this));\n  }\n}\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/hero.js":
/*!*********************!*\
  !*** ./src/hero.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// const mando = require('../src/sprites/mandalorian2.png')\n\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Bullet = __webpack_require__(/*! ./bullet */ \"./src/bullet.js\");\n\nclass Hero extends MovingObject{\n\n  constructor(options){\n    super(options);\n    this.health = 5;\n    this.vel = 0;\n    this.width = 48;\n    this.height = 72;\n    this.frameX = 0;\n    this.frameY = 2;\n    this.dir = \"right\"\n    this.up = false;\n    this.pos = [this.game.DIM_X / 3, this.game.DIM_Y - this.height];\n    this.alive = true;\n    this.moving = false;\n    this.heroSprite = new Image();\n    this.heroSprite.src = \"../src/sprites/mandalorian2.png\";\n    this.gunSpriteRight = new Image();\n    this.gunSpriteRight.src = \"../src/sprites/US.png\";\n    this.gunSpriteLeft = new Image();\n    this.gunSpriteLeft.src = \"../src/sprites/US-flipped.png\";\n    this.gunSpriteUpRight = new Image();\n    this.gunSpriteUpRight.src = \"../src/sprites/US-up.png\";\n    this.gunSpriteUpLeft = new Image();\n    this.gunSpriteUpLeft.src = \"../src/sprites/US-flipped-up.png\";\n  }\n\n  draw(ctx) {\n    ctx.drawImage(\n      this.heroSprite,\n      32 * this.frameX,\n      48 * this.frameY,\n      32,\n      48,\n      this.pos[0],\n      this.pos[1],\n      this.width,\n      this.height\n    );\n\n    if (this.dir === \"left\" && !this.up){\n      ctx.drawImage(\n      this.gunSpriteLeft,\n      64, 15, 32, 15, this.pos[0] - this.width/2 ,this.pos[1] + this.height/3, 64, 30\n      )\n    }\n\n    if (this.dir === \"right\" && !this.up){\n      ctx.drawImage(\n      this.gunSpriteRight,\n      0, 15, 32, 15, this.pos[0] + this.width/6,this.pos[1] + this.height/3, 64, 30\n      )\n    }\n\n    if (this.dir === \"right\" && this.up){\n      ctx.drawImage(\n      this.gunSpriteUpRight,\n      15, 64, 15, 32, this.pos[0] + this.width/6,this.pos[1], 30, 64\n      )\n    }\n\n    if (this.dir === \"left\" && this.up){\n      ctx.drawImage(\n      this.gunSpriteUpLeft,\n      60, 64, 15, 32, this.pos[0] + this.width/6,this.pos[1], 30, 64\n      )\n    }\n    \n  }\n\n  loseHealth(){\n    \n    \n    if (this.health > 0){\n      const hearts = document.getElementsByClassName(\"heart\");\n      hearts[this.health - 1].classList.add(\"hidden\");\n    };\n    \n    this.health -= 1;\n    \n    if (this.health <= 0) {\n      this.alive = false;\n      this.game.lost = true;\n    }\n  }\n\n  shoot(){\n    const bullet = new Bullet({game: this.game, pos: [this.pos[0] + this.width/3, this.pos[1] + this.height/2], dir: this.dir, up: this.up})\n    this.game.addBullet(bullet);\n\n  }\n}\n\nmodule.exports = Hero;\n\n//# sourceURL=webpack:///./src/hero.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\nconst MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\nconst Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\nconst GameView = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\nwindow.MovingObject = MovingObject;\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  const canvas = document.getElementById(\"game-canvas\");\n  const game = new Game();\n  canvas.width = game.DIM_X;\n  canvas.height = game.DIM_Y;\n  const ctx = canvas.getContext(\"2d\");\n\n\n  const gameView = new GameView(game, ctx);\n\n  const start = document.getElementsByClassName(\"start-button\")[0];\n  const title = document.getElementsByClassName(\"title-screen\")[0];\n  start.addEventListener(\"click\", function () {\n    title.classList.add(\"hidden\");\n    gameView.start();\n  })\n  \n  const song = document.getElementsByClassName(\"song\")[0];\n  song.volume = 0.4;\n  const toggleSong = document.getElementsByClassName(\"toggle-music\")[0];\n  toggleSong.addEventListener(\"click\", function() {\n    song.muted = !song.muted;\n  })\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nclass MovingObject {\n\n  constructor(options){\n    this.game = options.game;\n  }\n\n  move(delta){\n    let dir = 1;\n    if (this.dir === \"left\") dir = -1;\n    const divider = 1000 / 7;\n    const velX = this.vel * (delta / divider);\n    const dest = this.pos[0] + velX * dir;\n    \n    if (dest <= this.game.DIM_X - this.width && dest >= 0) {\n      this.pos[0] = this.pos[0] + velX * dir;\n    }\n  } \n\n  remove(){\n    this.game.remove(this);\n  }\n\n  collideWith(otherObject){\n\n  }\n\n  isCollidedWith(otherObject){\n  }\n}\n\nmodule.exports = MovingObject;\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/phoenix.js":
/*!************************!*\
  !*** ./src/phoenix.js ***!
  \************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Enemy = __webpack_require__(/*! ./enemy */ \"./src/enemy.js\");\nconst PhoenixBlast = __webpack_require__(/*! ./phoenix_blast */ \"./src/phoenix_blast.js\");\n\nclass Phoenix extends Enemy {\n  constructor(options) {\n    super(options);\n    this.width = 48;\n    this.height = 72;\n    this.pos = options.pos;\n    this.vel = 10;\n    this.dir = options.dir;\n    this.frameY = options.frameY;\n    this.ready = true;\n    this.phoenixSprite = new Image();\n    this.phoenixSprite.src = \"../src/sprites/phoenix.png\";\n  }\n\n  draw(ctx) {\n    ctx.drawImage(\n      this.phoenixSprite,\n      96 * this.frameX,\n      96 * this.frameY,\n      96,\n      96,\n      this.pos[0],\n      this.pos[1],\n      this.width,\n      this.height\n    );\n  }\n\n  shoot() {\n    const blast = new PhoenixBlast({game: this.game, pos: [this.pos[0] + this.width/2, this.pos[1] + this.height]})\n    // setInterval(this.game.addBlast(blast), 5000);\n    console.log(\"blasting\");\n    this.game.addBlast(blast);\n  }\n}\n\nmodule.exports = Phoenix;\n\n\n//# sourceURL=webpack:///./src/phoenix.js?");

/***/ }),

/***/ "./src/phoenix_blast.js":
/*!******************************!*\
  !*** ./src/phoenix_blast.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Hero = __webpack_require__(/*! ./hero */ \"./src/hero.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\nclass PhoenixBlast extends MovingObject {\n  constructor(options) {\n    super(options);\n    this.pos = options.pos;\n    // this.dir = options.dir;\n    this.vel = 10;\n    this.width = 20;\n    this.up = options.up;\n  }\n\n  move() {\n    this.pos = [this.pos[0], this.pos[1] + this.vel];\n\n    // if (this.up) this.pos = [this.pos[0], this.pos[1] - this.vel];\n    // else {\n    //   switch (this.dir) {\n    //     case \"right\":\n    //       this.pos = [this.pos[0] + this.vel, this.pos[1]];\n    //       break;\n    //     case \"left\":\n    //       this.pos = [this.pos[0] - this.vel, this.pos[1]];\n    //       break;\n    //     default:\n    //   }\n    // }\n  }\n\n  draw(ctx) {\n    ctx.fillStyle = \"orange\";\n\n    ctx.beginPath();\n    ctx.arc(this.pos[0], this.pos[1], this.width, 0, 2 * Math.PI, true);\n    ctx.fill();\n  }\n\n  isCollidedWith(otherObject) {\n    let centerDist;\n\n    if (otherObject instanceof Hero)\n      centerDist = Util.dist(\n        [otherObject.pos[0] + otherObject.width / 2, otherObject.pos[1] + otherObject.height / 2],\n        this.pos\n      );\n    else centerDist = Util.dist(this.pos, otherObject.pos);\n    return centerDist < this.width / 2 + otherObject.height / 2;\n  }\n\n  collideWith(otherObject) {\n    if (otherObject instanceof Hero) {\n      otherObject.loseHealth();\n      this.remove();\n      return otherObject.health;\n    } \n    // else if (otherObject instanceof Bullet) {\n    //   this.remove();\n    //   this.game.killCount++;\n    //   otherObject.remove();\n    //   return true;\n    // }\n    return false;\n  }\n}\n\nmodule.exports = PhoenixBlast;\n\n\n//# sourceURL=webpack:///./src/phoenix_blast.js?");

/***/ }),

/***/ "./src/titan.js":
/*!**********************!*\
  !*** ./src/titan.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Enemy = __webpack_require__(/*! ./enemy */ \"./src/enemy.js\");\n\nclass Titan extends Enemy {\n  constructor(options) {\n    super(options);\n    this.width = 48;\n    this.height = 72;\n    this.pos = options.pos;\n    this.vel = 10;\n    this.dir = options.dir;\n    this.frameY = options.frameY;\n    this.titanSprite = new Image();\n    this.titanSprite.src = \"../src/sprites/titan.png\";\n  }\n\n  draw(ctx) {\n    //   const enemySprite = new Image();\n\n    //   enemySprite.onload = () => {\n    //   ctx.drawImage(enemySprite, 40 * this.frameX, 56 * this.frameY, 40, 56, this.pos[0], this.pos[1], this.width, this.height);\n    //  };\n    //   enemySprite.src = \"../src/sprites/titan.png\";\n    ctx.drawImage(\n      this.titanSprite,\n      40 * this.frameX,\n      56 * this.frameY,\n      40,\n      56,\n      this.pos[0],\n      this.pos[1],\n      this.width,\n      this.height\n    );\n  }\n}\n\nmodule.exports = Titan;\n\n//# sourceURL=webpack:///./src/titan.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ ((module) => {

eval("const Util = {\n  dist(pos1, pos2) {\n    return Math.sqrt(\n      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)\n    );\n  },\n};\n\nmodule.exports = Util;\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;