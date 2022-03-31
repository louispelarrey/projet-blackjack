export {
    Cards
}

import {
    Game
} from "./Game.js";
import {
    secureFetch
} from "../fetch.js";

class Cards extends Game {
    _img;
    _code;

    constructor() {
        super()
    }

    // Tirer une carte et ajouter la valeur au score
    drawCard = async () => {
        let card = await this.drawCardApi(this.DeckObject.deckId);
        let cardCode = card.code;
        this.showCard(card);
        this.scoreValue += this.computeScore(cardCode);
        this.availableCardsValue = await this.computeAvailableCards();
        this.scoreElement.textContent = this.scoreValue.toString();
        this.availableCardsElement.textContent = this.availableCardsValue.toString();
        if (this.scoreValue > 21 || this.availableCardsValue === 0) {
            this.gameIsOver();
        }
    }

    // Paramètre: Id du deck utilisé.
    // Retour: Carte piochée.
    drawCardApi = async deckId => {
        const res = await secureFetch(
            `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
        );
        this.remainingCards = res.remainingCards;
        this.deckCardsElement.removeChild(
            this.deckCardsElement.getElementsByTagName('img')[this.deckCardsElement.getElementsByTagName('img').length - 1]
        );
        return res.cards[0];
    }

    showCard = card => {
        const cardDomElement = document.createElement("img")
        this.playerCards.push(card)
        cardDomElement.src = card.image;
        this.randomRotate(cardDomElement)
        this.playerCardsElement.appendChild(cardDomElement)
    }

    randomRotate = cardDomElement => {
        cardDomElement.style.transform = "rotate(" + this.randomIntFromInterval(-45, 45) + "deg)"
    }

    randomIntFromInterval = (min, max) => { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}