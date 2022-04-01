
export { Game }

import { Cards } from "./Cards.js";
import { Deck } from "./Deck.js"

class Game {
    _Cards;

    constructor(Cards){
        this._Cards = Cards;
    }

    _scoreValue = 0;
    _inProgress = false;
    _availableCardsValue = 5;
    _playerCards = [];
    _remainingCards = 0;

    _startGameElement = document.getElementById("btn-start");
    _drawCardElement = document.getElementById("btn-draw");
    _stopGameElement = document.getElementById("btn-stop");
    _informationElement = document.getElementById("gameResult");
    _scoreElement = document.getElementById("score");
    _availableCardsElement = document.getElementById("available-cards");
    _playerCardsElement = document.getElementById("player-cards");
    _deckCardsElement = document.getElementById("deck-cards");

    // Lancer une nouvelle partie.
    startGame = () => {
        this.scoreValue = 0;
        this.availableCardsValue = 5;
        this.scoreElement.textContent = "0";
        this.availableCardsElement.textContent = "5";
        this.empty(this.playerCardsElement)
        this.informationElement.style.display = "none";
        this.inProgress = true;
        this.initButtons(this.inProgress);
    };

    // // Arrêter la partie (clic sur bouton "stop")
    stopGame = async () => {
        await this.drawCard();
        this.informationElement.style.display = "inline-block";
        this.informationElement.textContent = this.scoreValue > 21 ? "Gagné !" : "Perdu !";
        this.inProgress = false;
        this.initButtons(this.inProgress);
    };

    // Tirer une carte et ajouter la valeur au score
    drawCard = async () => {
        let card = await this.Cards.drawCardApi(this.Cards.Deck.deckId);
        this.Cards.showCard(card);
        this.Cards.Deck.remainingCards--;
        this.checkRemainingCards();
        this.scoreValue += this.computeScore(card.code);
        this.availableCardsValue = await this.computeAvailableCards();
        this.scoreElement.textContent = this.scoreValue.toString();
        this.availableCardsElement.textContent = this.availableCardsValue.toString();
        if (this.scoreValue >= 21 || this.availableCardsValue === 0) {
            await this.gameIsOver();
        }
    }

    

    async checkRemainingCards() {
        switch (this.Cards.Deck.remainingCards) {
            case 1:
                await this.stopGame();
                break;
            case 0:
                this.Cards.Deck = new Deck();
                break;
            default:
                break;
        }
    }

    computeScore = cardCode => {
        let cardValue = cardCode.slice(0, -1);
        switch (cardValue) {
          case "A":
            return 0;
          case "J":
          case "Q":
          case "K":
            return 10;
            default:
                return parseInt(cardValue);
        }
    };

    computeAvailableCards = async () => {
        let availableCardsValue = parseInt(this.availableCardsElement.textContent);
        availableCardsValue--;
        return availableCardsValue;
    }

    gameIsOver = async () => {
        this.informationElement.style.display = "inline-block";
        console.log(window.navigator.vibrate([100,30,100,30,100,30]));
        this.informationElement.textContent = this.scoreValue === 21 ? "Gagné !" : "Perdu !";
        this.inProgress = false;
        this.initButtons(this.inProgress);
    };

    // Activation/Désactivation des boutons
    initButtons = inProgress => {
        if (inProgress) {
            this.drawCardElement.disabled = false;
            this.stopGameElement.disabled = false;
            this.startGameElement.disabled = true;
        } else {
            this.drawCardElement.disabled = true;
            this.stopGameElement.disabled = true;
            this.startGameElement.disabled = false;
        }
    };

    empty = element => {
        while (element.firstElementChild) {
            element.firstElementChild.remove();
        }
    }

    set DeckObject(value) {
        this._DeckObject = value;
    }

    set scoreValue(value) {
        this._scoreValue = value;
    }

    set inProgress(value) {
        this._inProgress = value;
    }

    set availableCardsValue(value) {
        this._availableCardsValue = value;
    }

    set playerCards(value) {
        this._playerCards = value;
    }

    set startGameElement(value) {
        this._startGameElement = value;
    }

    set drawCardElement(value) {
        this._drawCardElement = value;
    }

    set stopGameElement(value) {
        this._stopGameElement = value;
    }

    set informationElement(value) {
        this._informationElement = value;
    }

    set scoreElement(value) {
        this._scoreElement = value;
    }

    set availableCardsElement(value) {
        this._availableCardsElement = value;
    }

    set playerCardsElement(value) {
        this._playerCardsElement = value;
    }

    set deckCardsElement(value) {
        this._deckCardsElement = value;
    }

    set remainingCards(value) {
        this._remainingCards = value;
    }

    get DeckObject() {
        return this._DeckObject;
    }

    get scoreValue() {
        return this._scoreValue;
    }

    get inProgress() {
        return this._inProgress;
    }

    get availableCardsValue() {
        return this._availableCardsValue;
    }

    get playerCards() {
        return this._playerCards;
    }

    get remainingCards() {
        return this._remainingCards;
    }

    get startGameElement() {
        return this._startGameElement;
    }

    get drawCardElement() {
        return this._drawCardElement;
    }

    get stopGameElement() {
        return this._stopGameElement;
    }

    get informationElement() {
        return this._informationElement;
    }

    get scoreElement() {
        return this._scoreElement;
    }

    get availableCardsElement() {
        return this._availableCardsElement;
    }

    get playerCardsElement() {
        return this._playerCardsElement;
    }

    get deckCardsElement() {
        return this._deckCardsElement;
    }

    get Cards() {
        return this._Cards;
    }

    set Cards(value) {
        this._Cards = value;
    }
}