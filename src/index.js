
const MovingObject = require("./moving_object.js");
const Game = require("./game");
const GameView = require("./game_view");
window.MovingObject = MovingObject;

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("game-canvas");
  let game = new Game();
  canvas.width = 800;
  canvas.height = 500;
  const ctx = canvas.getContext("2d");
  let gameView = new GameView(game, ctx);

  // const start = document.getElementsByClassName("start-button")[0];
  const title = document.getElementsByClassName("title-screen")[0];
  // const restarts = document.getElementsByClassName("restart");
  const endScreens = document.getElementsByClassName("end-game");
  const hearts = document.getElementsByClassName("heart");
  const song = document.getElementsByClassName("song")[0];
  song.src = "./src/sprites/mando-song.mp3"
  song.volume = 0.4;
  const ingame = document.getElementsByClassName("ingame-toggle")[0];
  // start.addEventListener("click", function () {
  //   game = new Game();
  //   gameView = new GameView(game, ctx);
  //   title.classList.add("hidden");
  //   canvas.classList.remove("hidden");
  //   gameView.start();
  //   // console.log(gameView.game);
  // })

  document.addEventListener('click', function(e) {
    if (e.target.matches(".restart")) {
      game = new Game();
      gameView = new GameView(game, ctx);
      title.classList.remove("hidden");
      for (i = 0; i < 2; i++) {
        endScreens[i].classList.add("hidden");
         
      }
      for (i = 0; i < 5; i++) {
        hearts[i].classList.remove("hidden");
      }
      ingame.classList.add("hidden"); 
      //  console.log(endScreens);
    }

    if (e.target.matches(".start-button")) {
      
      title.classList.add("hidden");
      ingame.classList.remove("hidden");
      gameView.start();
    }

    if (e.target.matches(".toggle-music")) {
      song.muted = !song.muted;
      console.log(song); 
    }
  })
  
  
  
  // const toggleSong = document.getElementsByClassName("toggle-music")[0];
  // toggleSong.addEventListener("click", function() {
  //   song.muted = !song.muted;
  //   console.log(song); 
  // })
});