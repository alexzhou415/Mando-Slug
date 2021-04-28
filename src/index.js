console.log("webpack is working");

const MovingObject = require("./moving_object.js");
const Enemy = require("./enemy");
const Hero = require("./hero");
window.MovingObject = MovingObject;

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("game-canvas");
  canvas.width = 900;
  canvas.height = 600;
  const ctx = canvas.getContext("2d");
  const hero = new Hero({ pos: [200, 120], vel: [100, 100] });
  const enemy = new Enemy({ pos: [600, 120], vel: [100, 100] });
  const image = new Image();
  
  image.onload = () => { ctx.drawImage(image, 0, 0, 32, 48, 0, 0, 48, 72);}
  image.src = "../src/sprites/mandalorian2.png";
  hero.draw(ctx);
  enemy.draw(ctx);
  window.hero = hero;
  window.ctx = ctx;
  window.move = MovingObject.prototype.move;
  window.draw = MovingObject.prototype.draw;
});