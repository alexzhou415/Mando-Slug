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

  const start = document.getElementsByClassName("start-button")[0];
  const title = document.getElementsByClassName("title-screen")[0];
  start.addEventListener("click", function () {
    title.classList.add("hidden");
    gameView.start();
  })
  // if (gameView.game) gameView.start();
  
  const song = document.getElementsByClassName("song")[0];
  const toggleSong = document.getElementsByClassName("toggle-music")[0];
  // song.muted = !song.muted;
  toggleSong.addEventListener("click", function() {
    // if (song.classList.contains("muted")) song.classList.remove("muted");
    // else song.classList.add("muted")
    song.muted = !song.muted;
    // song.classList.toggle("muted");
  })
});