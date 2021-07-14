
const MovingObject = require("./moving_object.js");
const Game = require("./game");
const GameView = require("./game_view");
window.MovingObject = MovingObject;

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("game-canvas");
  let game;
  canvas.width = 800;
  canvas.height = 500;
  const ctx = canvas.getContext("2d");
  let gameView;

  const start = document.getElementsByClassName("start-button")[0];
  const title = document.getElementsByClassName("title-screen")[0];
  const restarts = document.getElementsByClassName("restart");
  const endScreens = document.getElementsByClassName("end-game");

  start.addEventListener("click", function () {
    game = new Game();
    gameView = new GameView(game, ctx);
    title.classList.add("hidden");

    gameView.start();
    // console.log(gameView.game);
  })
  // for (i = 0; i < 2; i++){
  //   console.log(i);
  //   restarts[i].addEventListener("click", function() {
  //     console.log(i);
  //     // console.log(title);
  //     endScreens[i].classList.add("hidden");
  //     title.classList.remove("hidden");
  //   })
  // }

  document.addEventListener('click', function(e) {
    if (e.target.matches(".restart")) {
       for (i = 0; i < 2; i++) {
         console.log(i);
         endScreens[i].classList.add("hidden");
        //  endScreens[i].classList.add("sadfasd");
         console.log(endScreens[i]);
         title.classList.remove("hidden");
       }
      //  console.log(endScreens);
    }
  })
  
  
  const song = document.getElementsByClassName("song")[0];
  song.volume = 0.4;
  const toggleSong = document.getElementsByClassName("toggle-music")[0];
  toggleSong.addEventListener("click", function() {
    song.muted = !song.muted;
  })
});