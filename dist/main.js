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

/***/ "./src/bullet.js":
/*!***********************!*\
  !*** ./src/bullet.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\n\nclass Bullet extends MovingObject {\n  constructor(options){\n    super(options);\n    this.pos = options.pos;\n    this.dir = options.dir;\n    this.vel = 100;\n    this.radius = 3;\n  }\n\n  move(){\n    switch (this.dir) {\n      case \"right\": \n        this.pos = [this.pos[0] + this.vel, this.pos[1]];\n      case \"left\":\n        this.pos = [this.pos[0] - this.vel, this.pos[1]];\n      case \"up\":\n        this.pos = [this.pos[0], this.pos[1] - this.vel];\n    }\n  }\n\n  draw(ctx) {\n    ctx.fillStyle = \"gray\";\n\n    ctx.beginPath();\n    ctx.arc(\n      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true\n    );\n    ctx.fill();\n  };\n}\n\nmodule.exports = Bullet;\n\n//# sourceURL=webpack:///./src/bullet.js?");

/***/ }),

/***/ "./src/enemy.js":
/*!**********************!*\
  !*** ./src/enemy.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Hero = __webpack_require__(/*! ./hero */ \"./src/hero.js\");\nconst Bullet = __webpack_require__(/*! ./bullet */ \"./src/bullet.js\");\nclass Enemy extends MovingObject{\n\n  constructor(options){\n    super(options);\n    this.vel = -10;\n    this.width = 48;\n    this.height = 72;\n    this.frameX = 0;\n    this.frameY = 1;\n    this.pos = [this.game.DIM_X - this.width, this.game.DIM_Y - this.height];\n    this.moving = true;\n  }\n\n  draw(ctx){\n    const enemySprite = new Image();\n    enemySprite.src = \"../src/sprites/titan.png\";\n    enemySprite.onload = () => {\n    ctx.drawImage(enemySprite, 40 * this.frameX, 56 * this.frameY, 40, 56, this.pos[0], this.pos[1], this.width, this.height);\n   };\n  }\n\n  collideWith(otherObject){\n    if (otherObject instanceof Hero) {\n      // console.log(\"collision\");\n      // otherObject.loseHealth();\n      otherObject.remove();\n      return true;\n    } else if (otherObject instanceof Bullet) {\n      this.remove();\n      otherObject.remove();\n      return true;\n    }\n    return false;\n  }\n}\n\nmodule.exports = Enemy;\n\n//# sourceURL=webpack:///./src/enemy.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Hero = __webpack_require__(/*! ./hero */ \"./src/hero.js\");\nconst Enemy = __webpack_require__(/*! ./enemy */ \"./src/enemy.js\");\nconst Bullet = __webpack_require__(/*! ./bullet */ \"./src/bullet.js\");\n\nclass Game {\n  constructor() {\n    this.enemies = [];\n    this.hero = [];\n    this.bullets = [];\n    this.DIM_X = 800;\n    this.DIM_Y = 500;\n    this.NUM_ENEMIES = 3;\n\n    this.addEnemies();\n  }\n\n  addEnemies() {\n    let currentEnemies = this.enemies.length;\n    for (let i = currentEnemies; i < this.NUM_ENEMIES; i++) {\n      this.enemies.push(new Enemy({ game: this }));\n    }\n  }\n\n  addHero() {\n    const hero = new Hero({ game: this });\n    this.hero.push(hero);\n\n    return hero;\n  }\n\n  addBullet(bullet){\n    this.bullets.push(bullet);\n  }\n\n  remove(object) {\n    if (object instanceof Bullet) {\n      this.bullets.splice(this.bullets.indexOf(object), 1);\n    } else if (object instanceof Enemy) {\n      this.enemies.splice(this.enemies.indexOf(object), 1);\n    } else if (object instanceof Hero) {\n      this.hero.splice(this.hero.indexOf(object), 1);\n    } else {\n      throw new Error(\"unknown type of object\");\n    }\n  }\n\n  allObjects() {\n    return [].concat(this.hero, this.enemies);\n  }\n\n  draw(ctx) {\n    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);\n    // console.log(this.allObject)\n    this.allObjects().forEach((object) => object.draw(ctx));\n  }\n\n  moveObjects() {\n    this.allObjects().forEach((object) => object.move());\n  }\n\n  checkCollisions() {\n    const allObjects = this.allObjects();\n    for (let i = 0; i < allObjects.length; i++) {\n      for (let j = 0; j < allObjects.length; j++) {\n        if (i !== j) {\n          const obj1 = allObjects[i];\n          const obj2 = allObjects[j];\n\n          if (obj1.isCollidedWith(obj2)) {\n            const collision = obj1.collideWith(obj2);\n            if (collision) return;\n          }\n        }\n      }\n    }\n  }\n\n  handleObjectFrame() {\n    this.allObjects().forEach((object) => {\n      console.log(object.frameX);\n      if (object.frameX < 3 && object.moving) object.frameX += 1;\n      else object.frameX = 0;\n    });\n  }\n\n  step() {\n    this.moveObjects();\n    this.checkCollisions();\n    this.handleObjectFrame();\n  }\n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\nconst Hero = __webpack_require__(/*! ./hero */ \"./src/hero.js\");\n\nclass GameView {\n\n  constructor(game, ctx) {\n    this.game = game;\n    this.hero = this.game.addHero();\n    this.ctx = ctx;\n    console.log(this.game);\n    console.log(\"in constructor\");\n  }\n\n\n  bindKeyHandlers(){\n    const keys = [];\n    let that = this;\n    document.addEventListener(\"keydown\", function (e) {\n\n      keys[e.key] = true;\n      if (keys[\"w\"] && that.hero.pos[0] > 0) {\n        that.hero.dir = \"up\";\n      }\n      if (keys[\"a\"] && that.hero.pos[0] > 0) {\n        that.hero.moving = true;\n        that.hero.vel = -10;\n        that.hero.frameY = 1;\n        that.hero.dir = \"left\";\n      }\n      if (keys[\"d\"] && that.hero.pos[0] < that.game.DIM_X - that.hero.width) {\n        that.hero.moving = true;\n        that.hero.vel = 10;\n        that.hero.frameY = 2;\n        that.hero.dir = \"right\";\n      }\n      \n    });\n\n    document.addEventListener(\"keyup\", function (e) {\n      delete keys[e.key];\n      that.hero.vel = 0;\n      that.hero.moving = false;\n    });\n  }\n\n  // handleHeroFrame(){\n  //   if (this.hero.frameX < 3 && this.hero.moving) this.hero.frameX += 1;\n  //   else this.hero.frameX = 0;\n  // }\n  \n\n  start(){\n    this.bindKeyHandlers();\n    let that = this;\n    setInterval( function(){\n      that.game.step();\n      that.game.draw(that.ctx);\n      // that.handleHeroFrame();\n    }, 100)\n  }\n}\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/hero.js":
/*!*********************!*\
  !*** ./src/hero.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// const mando = require('../src/sprites/mandalorian2.png')\n\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Bullet = __webpack_require__(/*! ./bullet */ \"./src/bullet.js\");\n\nclass Hero extends MovingObject{\n\n  constructor(options){\n    super(options);\n    this.health = 3;\n    this.vel = 0;\n    this.width = 48;\n    this.height = 72;\n    this.frameX = 0;\n    this.frameY = 2;\n    this.dir = \"right\"\n    this.pos = [this.game.DIM_X / 3, this.game.DIM_Y - this.height];\n    this.alive = true;\n    this.moving = false;\n  }\n\n  draw(ctx) {\n    const heroSprite = new Image();\n    heroSprite.src = \"../src/sprites/mandalorian2.png\";\n    heroSprite.onload = () => {ctx.drawImage(heroSprite, 32 * this.frameX, 48 * this.frameY, 32, 48, this.pos[0], this.pos[1], this.width, this.height);}\n    \n    console.log(\"drawing\");\n  }\n\n  loseHealth(){\n    this.health -= 1;\n    if (this.health === 0) this.alive = false;\n  }\n\n  shoot(){\n    const bullet = new Bullet({game: this.game, pos: this.pos, dir: this.dir})\n    this.game.addBullet(bullet);\n  }\n\n  // move(){\n\n  // }\n}\n\nmodule.exports = Hero;\n\n//# sourceURL=webpack:///./src/hero.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("console.log(\"webpack is working\");\n\nconst MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\nconst Enemy = __webpack_require__(/*! ./enemy */ \"./src/enemy.js\");\nconst Hero = __webpack_require__(/*! ./hero */ \"./src/hero.js\");\nconst Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\nconst GameView = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\nwindow.MovingObject = MovingObject;\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  const canvas = document.getElementById(\"game-canvas\");\n  const game = new Game();\n  canvas.width = game.DIM_X;\n  canvas.height = game.DIM_Y;\n  const ctx = canvas.getContext(\"2d\");\n\n\n  const gameView = new GameView(game, ctx);\n  // console.log(gameView.game);\n  if (gameView.game) gameView.start();\n  \n  window.ctx = ctx;\n  window.move = MovingObject.prototype.move;\n  window.draw = MovingObject.prototype.draw;\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nclass MovingObject {\n\n  constructor(options){\n    this.game = options.game;\n  }\n\n  move(){\n    const dest = this.pos[0] + this.vel;\n    if (dest <= this.game.DIM_X - this.width && dest >= 0) {\n      this.pos[0] = this.pos[0] + this.vel;\n    }\n  } \n\n  remove(){\n    this.game.remove(this);\n  }\n\n  collideWith(otherObject){\n\n  }\n\n  isCollidedWith(otherObject){\n\n    //fix hitbox\n    const centerDist = Util.dist(this.pos, otherObject.pos);\n    return centerDist < (Math.min(this.height/2, this.width/2) + Math.min(otherObject.height/2, otherObject.width/2));\n  }\n}\n\nmodule.exports = MovingObject;\n\n//# sourceURL=webpack:///./src/moving_object.js?");

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