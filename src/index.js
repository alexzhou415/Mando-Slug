
const MovingObject = require("./moving_object.js");
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

  const start = document.getElementsByClassName("start-button")[0];
  const title = document.getElementsByClassName("title-screen")[0];
  start.addEventListener("click", function () {
    title.classList.add("hidden");
    gameView.start();
  })
  
  const song = document.getElementsByClassName("song")[0];
  song.volume = 0.4;
  const toggleSong = document.getElementsByClassName("toggle-music")[0];
  toggleSong.addEventListener("click", function() {
    song.muted = !song.muted;
  })
});