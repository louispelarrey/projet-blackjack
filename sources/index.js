import { Deck } from "./librairy/entities/Deck.js";
import { Cards } from "./librairy/entities/Cards.js";
import { secureFetch } from "./librairy/fetch.js";
import { Game } from "./librairy/entities/Game.js";

const startGameElement = document.getElementById("btn-start");
const drawCardElement = document.getElementById("btn-draw");
const stopGameElement = document.getElementById("btn-stop");
const informationElement = document.getElementById("gameResult");
const scoreElement = document.getElementById("score");
const availableCardsElement = document.getElementById("available-cards");
const playerCardsElement = document.getElementById("player-cards");
const deckCardsElement = document.getElementById("deck-cards");

// let scoreValue = 0;
// let inProgress = false;
// let availableCardsValue = 5;
// let playerCards = [];
// let remainingCards = 0;
//const DeckObject = new Deck();

const GameObject = new Game();

this.startGameElement.addEventListener("click", GameObject.startGame());
this.drawCardElement.addEventListener("click", GameObject.CardObject.drawCard());
this.stopGameElement.addEventListener("click", GameObject.stopGame());

// Activation/Désactivation des boutons
// const initButtons = (inProgress) => {
//   if (inProgress) {
//     drawCardElement.disabled = false;
//     stopGameElement.disabled = false;
//     startGameElement.disabled = true;
//   } else {
//     drawCardElement.disabled = true;
//     stopGameElement.disabled = true;
//     startGameElement.disabled = false;
//   }
// };

// // Tirer une carte et ajouter la valeur au score
// const drawCard = async () => {
//   let card = await drawCardApi(DeckObject.deckId);
//   let cardCode = card.code;
//   showCard(card);
//   scoreValue += await computeScore(cardCode, scoreValue);
//   availableCardsValue = await computeAvailableCards();
//   scoreElement.textContent = scoreValue;
//   availableCardsElement.textContent = availableCardsValue;
//   if (scoreValue > 21 || availableCardsValue === 0) {
//     gameIsOver();
//   }
// };

// // Lancer une nouvelle partie.
// const startGame = async () => {
//   scoreValue = 0;
//   availableCardsValue = 5;
//   scoreElement.textContent = 0;
//   availableCardsElement.textContent = 5;
//   empty(playerCardsElement)
//   informationElement.style.display = "none";
//   inProgress = true;
//   initButtons(inProgress);
// };

// // Arrêter la partie (clic sur bouton "stop")
// const stopGame = async () => {
//   CardObject.drawCard();
//   informationElement.style.display = "inline-block";
//   informationElement.textContent = scoreValue > 21 ? "Gagné !" : "Perdu !";
//   inProgress = false;
//   initButtons(inProgress);
// };

// // Arrêter la partie (score >= 21)
// const gameIsOver = () => {
//   informationElement.style.display = "inline-block";
//   informationElement.textContent = scoreValue == 21 ? "Gagné !" : "Perdu !";
//   inProgress = false;
//   initButtons(inProgress);
// };

// startGameElement.addEventListener("click", Game.startGame);
// drawCardElement.addEventListener("click", CardObject.drawCard);
// stopGameElement.addEventListener("click", stopGame);

// // Paramètre : Code de la carte (2S,JD,KC,AH, ...).
// // Retour : Valeur de la carte passée en paramètre (2S => 2, JD => 10, KC => 10, AH => 0, ...).
// const computeScore = async (cardCode) => {
//   let cardValue = cardCode.slice(0, -1);
//   switch (cardValue) {
//     case "A":
//       return 0;
//     case "J":
//     case "Q":
//     case "K":
//       return 10;
//     default:
//       return parseInt(cardValue);
//   }
// };

// const computeAvailableCards = async () => {
//   let availableCardsValue = parseInt(availableCardsElement.textContent);
//   availableCardsValue--;
//   return availableCardsValue;
// }

// // Paramètre: Id du deck utilisé.
// // Retour: Carte piochée.
// const drawCardApi = deckId => {
//   let result = secureFetch(
//     `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
//   ).then((res) => {
//     remainingCards = res.remainingCards;
//     deckCardsElement.removeChild(deckCardsElement.getElementsByTagName('img')[deckCardsElement.getElementsByTagName('img').length-1])
//     return res.cards[0];
//   });
//   return result;
// };

// const showCard = card => {
//   const cardDomElement = document.createElement("img")
//   playerCards.push(card)
//   cardDomElement.src = card.image;
//   randomRotate(cardDomElement)
//   playerCardsElement.appendChild(cardDomElement)
// }

// const empty = element => {
//   while (element.firstElementChild) {
//     element.firstElementChild.remove();
//   }
// }

// const randomRotate = cardDomElement => {
//   cardDomElement.style.transform = "rotate(" + randomIntFromInterval(-45, 45) + "deg)"
// }

// const randomIntFromInterval = (min, max) => { // min and max included 
//   return Math.floor(Math.random() * (max - min + 1) + min)
// }