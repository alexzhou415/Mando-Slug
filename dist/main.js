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

/***/ "./src/enemy.js":
/*!**********************!*\
  !*** ./src/enemy.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\n\nclass Enemy extends MovingObject{\n\n  constructor(options){\n    super(options);\n  }\n\n  draw(ctx){\n    ctx.fillStyle = \"red\";\n    ctx.beginPath();\n    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);\n    ctx.fill();\n  }\n}\n\nmodule.exports = Enemy;\n\n//# sourceURL=webpack:///./src/enemy.js?");

/***/ }),

/***/ "./src/hero.js":
/*!*********************!*\
  !*** ./src/hero.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// const mando = require('./sprites/mandalorian2.png')\n\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\n\nclass Hero extends MovingObject{\n\n  constructor(options){\n    super(options);\n  }\n\n  draw(ctx) {\n    const heroSprite = new Image();\n    heroSprite.src = \"../src/sprites/mandalorian2.png\";\n    heroSprite.onload = () => {ctx.drawImage(heroSprite, 0, 0, 32, 48, 200, 120, 32, 48);}\n    \n    console.log(\"drawing\");\n  }\n\n}\n\nmodule.exports = Hero;\n\n//# sourceURL=webpack:///./src/hero.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("console.log(\"webpack is working\");\n\nconst MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\nconst Enemy = __webpack_require__(/*! ./enemy */ \"./src/enemy.js\");\nconst Hero = __webpack_require__(/*! ./hero */ \"./src/hero.js\");\nwindow.MovingObject = MovingObject;\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  const canvas = document.getElementById(\"game-canvas\");\n  canvas.width = 900;\n  canvas.height = 600;\n  const ctx = canvas.getContext(\"2d\");\n  const hero = new Hero({ pos: [200, 120], vel: [100, 100] });\n  const enemy = new Enemy({ pos: [600, 120], vel: [100, 100] });\n  const image = new Image();\n  \n  image.onload = () => { ctx.drawImage(image, 0, 0, 32, 48, 0, 0, 48, 72);}\n  image.src = \"../src/sprites/mandalorian2.png\";\n  hero.draw(ctx);\n  enemy.draw(ctx);\n  window.hero = hero;\n  window.ctx = ctx;\n  window.move = MovingObject.prototype.move;\n  window.draw = MovingObject.prototype.draw;\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/***/ ((module) => {

eval("class MovingObject {\n\n  constructor(options){\n    this.pos = options.pos;\n    this.vel = options.vel;\n    this.radius = 50;\n    this.game = options.game;\n  }\n  \n  \n\n\n  // draw(ctx, img, sx, sy, sw, sh, dx, dy, dw, dh) {\n    \n  //   ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh)\n  //   ctx.fillStyle = \"red\";\n  //   ctx.beginPath();\n  //   ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);\n  //   ctx.fill();\n  // }\n\n  move(){\n    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];\n  } \n}\n\n// MovingObject.prototype.draw = function \n\n// MovingObject.prototype.move = function \n\nmodule.exports = MovingObject;\n\n//# sourceURL=webpack:///./src/moving_object.js?");

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