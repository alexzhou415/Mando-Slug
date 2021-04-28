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
/***/ (() => {

eval("\n\n//# sourceURL=webpack:///./src/bullet.js?");

/***/ }),

/***/ "./src/enemy.js":
/*!**********************!*\
  !*** ./src/enemy.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Hero = __webpack_require__(/*! ./hero */ \"./src/hero.js\");\nconst Bullet = __webpack_require__(/*! ./bullet */ \"./src/bullet.js\");\nclass Enemy extends MovingObject{\n\n  constructor(options){\n    super(options);\n    this.vel = [0,0];\n    this.width = 48;\n    this.height = 72;\n    this.pos = [this.game.DIM_X - this.width, this.game.DIM_Y - this.height];\n  }\n\n  draw(ctx){\n    const enemySprite = new Image();\n    enemySprite.src = \"../src/sprites/titan.png\";\n    enemySprite.onload = () => {\n    ctx.drawImage(enemySprite, 0, 0, 40, 56, this.pos[0], this.pos[1], this.width, this.height);\n   };\n  }\n\n  collideWith(otherObject){\n    \n  }\n}\n\nmodule.exports = Enemy;\n\n//# sourceURL=webpack:///./src/enemy.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Hero = __webpack_require__(/*! ./hero */ \"./src/hero.js\");\nconst Enemy = __webpack_require__(/*! ./enemy */ \"./src/enemy.js\");\n\nclass Game {\n  constructor() {\n    this.enemies = [];\n    this.hero = [];\n    this.DIM_X = 900;\n    this.DIM_Y = 600;\n    this.NUM_ENEMIES = 3;\n\n    this.addEnemies();\n  }\n\n  addEnemies() {\n    for (let i = 0; i < this.NUM_ENEMIES; i++) {\n      this.enemies.push(new Enemy({ game: this }));\n    }\n  }\n\n  addHero() {\n    const hero = new Hero({ game: this });\n    this.hero.push(hero);\n  }\n\n  allObjects() {\n    return [].concat(this.hero, this.enemies);\n  }\n\n  draw(ctx) {\n    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);\n    // console.log(this.allObject)\n    this.allObjects().forEach((object) => object.draw(ctx));\n  }\n\n  moveObjects() {\n    console.log(this.allObjects());\n    this.allObjects().forEach((object) => object.move());\n  }\n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\nconst Hero = __webpack_require__(/*! ./hero */ \"./src/hero.js\");\n\nclass GameView {\n\n  constructor(game, ctx) {\n    this.game = game;\n    this.game.addHero();\n    this.ctx = ctx;\n    console.log(this.game);\n    console.log(\"in constructor\");\n  }\n\n  start(){\n    let that = this;\n    setInterval( function(){\n      that.game.moveObjects();\n      that.game.draw(that.ctx);\n    }, 1000)\n  }\n}\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/hero.js":
/*!*********************!*\
  !*** ./src/hero.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// const mando = require('./sprites/mandalorian2.png')\n\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\n\nclass Hero extends MovingObject{\n\n  constructor(options){\n    super(options);\n    this.health = 3;\n    this.vel = [100,0];\n    this.width = 48;\n    this.height = 72;\n    this.pos = [this.game.DIM_X / 3, this.game.DIM_Y - this.height];\n  }\n\n  draw(ctx) {\n    const heroSprite = new Image();\n    heroSprite.src = \"../src/sprites/mandalorian2.png\";\n    heroSprite.onload = () => {ctx.drawImage(heroSprite, 0, 0, 32, 48, this.pos[0], this.pos[1], this.width, this.height);}\n    \n    console.log(\"drawing\");\n  }\n\n}\n\nmodule.exports = Hero;\n\n//# sourceURL=webpack:///./src/hero.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("console.log(\"webpack is working\");\n\nconst MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\nconst Enemy = __webpack_require__(/*! ./enemy */ \"./src/enemy.js\");\nconst Hero = __webpack_require__(/*! ./hero */ \"./src/hero.js\");\nconst Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\nconst GameView = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\nwindow.MovingObject = MovingObject;\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  const canvas = document.getElementById(\"game-canvas\");\n  const game = new Game();\n  canvas.width = game.DIM_X;\n  canvas.height = game.DIM_Y;\n  const ctx = canvas.getContext(\"2d\");\n\n\n  const gameView = new GameView(game, ctx);\n  // console.log(gameView.game);\n  if (gameView.game) gameView.start();\n  \n  // const hero = new Hero({game: game });\n  // const enemy = new Enemy({game: game});\n  \n  // hero.draw(ctx);\n  // enemy.draw(ctx);\n  // window.hero = hero;\n  window.ctx = ctx;\n  window.move = MovingObject.prototype.move;\n  window.draw = MovingObject.prototype.draw;\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nclass MovingObject {\n\n  constructor(options){\n    this.game = options.game;\n  }\n  \n  \n\n\n  // draw(ctx, img, sx, sy, sw, sh, dx, dy, dw, dh) {\n    \n  //   ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh)\n  //   ctx.fillStyle = \"red\";\n  //   ctx.beginPath();\n  //   ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);\n  //   ctx.fill();\n  // }\n\n  move(){\n    // console.log(this.game.DIM_X);\n    // console.log(Math.min(this.pos[0] + this.vel[0], this.game.DIM_X));\n    this.pos = [Math.min(this.pos[0] + this.vel[0], this.game.DIM_X - this.width), \n    Math.min(this.pos[1] + this.vel[1], this.game.DIM_Y - this.height)];\n    console.log(this.pos);\n  } \n\n  collideWith(otherObject){\n\n  }\n\n  isCollidedWith(otherObject){\n    const centerDist = Util.dist(this.pos, otherObject.pos);\n    return centerDist < (Math.max(this.height/2, this.width/2) + Math.max(otherObject.height/2, otherObject.width/2));\n  }\n}\n\nmodule.exports = MovingObject;\n\n//# sourceURL=webpack:///./src/moving_object.js?");

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