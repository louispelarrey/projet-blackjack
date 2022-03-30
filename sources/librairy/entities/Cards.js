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

    // Tirer une carte et ajouter la valeur au score
    drawCard = async () => {
        let card = await this.drawCardApi(super.DeckObject.deckId);
        let cardCode = card.code;
        this.showCard(card);
        super.scoreValue += super.computeScore(cardCode);
        super.availableCardsValue = await super.computeAvailableCards();
        super.scoreElement.textContent = super.scoreValue.toString();
        super.availableCardsElement.textContent = super.availableCardsValue.toString();
        if (super.scoreValue > 21 || super.availableCardsValue === 0) {
            super.gameIsOver();
        }
    }

    // Paramètre: Id du deck utilisé.
    // Retour: Carte piochée.
    drawCardApi = async deckId => {
        const res = await secureFetch(
            `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
        );
        super.remainingCards = res.remainingCards;
        super.deckCardsElement.removeChild(
            super.deckCardsElement.getElementsByTagName('img')[super.deckCardsElement.getElementsByTagName('img').length - 1]
        );
        return res.cards[0];
    }

    showCard = card => {
        const cardDomElement = document.createElement("img")
        super.playerCards.push(card)
        cardDomElement.src = card.image;
        this.randomRotate(cardDomElement)
        super.playerCardsElement.appendChild(cardDomElement)
    }

    randomRotate = cardDomElement => {
        cardDomElement.style.transform = "rotate(" + this.randomIntFromInterval(-45, 45) + "deg)"
    }

    randomIntFromInterval = (min, max) => { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}