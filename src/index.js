console.log("webpack is working");

const MovingObject = require("./moving_object.js");
const Enemy = require("./enemy");
const Hero = require("./hero");
const Game = require("./game");
const GameView = require("./game_view");
window.MovingObject = MovingObject;

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("game-canvas");
  const game = new Game();
  canvas.width = game.DIM_X;
  canvas.height = game.DIM_Y;
  const ctx = canvas.getContext("2d");


  const gameView = new GameView(game, ctx);
  // console.log(gameView.game);
  if (gameView.game) gameView.start();
  
  // const hero = new Hero({game: game });
  // const enemy = new Enemy({game: game});
  
  // hero.draw(ctx);
  // enemy.draw(ctx);
  // window.hero = hero;
  window.ctx = ctx;
  window.move = MovingObject.prototype.move;
  window.draw = MovingObject.prototype.draw;
});