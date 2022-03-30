export { Game }

import { Deck } from "./Deck.js"

class Game {

    _DeckObject = new Deck();

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
        this._scoreValue = 0;
        this._availableCardsValue = 5;
        this._scoreElement.textContent = "0";
        this._availableCardsElement.textContent = "5";
        this.empty(this._playerCardsElement)
        this._informationElement.style.display = "none";
        this._inProgress = true;
        this.initButtons(this._inProgress);
    };

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
        let availableCardsValue = parseInt(this._availableCardsElement.textContent);
        availableCardsValue--;
        return availableCardsValue;
    }

    gameIsOver = () => {
        this._informationElement.style.display = "inline-block";
        this._informationElement.textContent = this._scoreValue === 21 ? "Gagné !" : "Perdu !";
        this._inProgress = false;
        this.initButtons(this.inProgress);
    };

    // Activation/Désactivation des boutons
    initButtons = inProgress => {
        if (inProgress) {
            this._drawCardElement.disabled = false;
            this._stopGameElement.disabled = false;
            this._startGameElement.disabled = true;
        } else {
            this._drawCardElement.disabled = true;
            this._stopGameElement.disabled = true;
            this._startGameElement.disabled = false;
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
}