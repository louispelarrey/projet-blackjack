import { Deck } from "./librairy/entities/Deck.js";
import { Cards } from "./librairy/entities/Cards.js";
import { Player } from "./librairy/entities/Player.js";
import { secureFetch } from "./librairy/fetch.js";
import { Game } from "./librairy/entities/Game.js";

const startGameElement = document.getElementById("btn-start");
const drawCardElement = document.getElementById("btn-draw");
const stopGameElement = document.getElementById("btn-stop");
const statusDisplayChildElement = document.getElementById("status-display").firstElementChild;
const informationElement = document.getElementById("gameResult");
const scoreElement = document.getElementById("score");
const availableCardsElement = document.getElementById("available-cards");
const playerCardsElement = document.getElementById("player-cards");

let DeckObject = new Deck();
let CardObject = new Cards(DeckObject);
const GameObject = new Game(CardObject);

startGameElement.addEventListener("click", GameObject.startGame);
drawCardElement.addEventListener("click", GameObject.drawCard);
stopGameElement.addEventListener("click", GameObject.stopGame);

window.addEventListener('online', () => {
    statusDisplayChildElement.style.color = "green"
    statusDisplayChildElement.style.borderColor = "green"
});
window.addEventListener('offline', () => {
    statusDisplayChildElement.style.color = "red"
    statusDisplayChildElement.style.borderColor = "red"
});