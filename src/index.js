import "./css/style.css";
import Game from "./js/classes/Game";

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game();
  game.init();
});
