export {
    Cards
}

import {
    Game
} from "./Game.js";
import {
    secureFetch
} from "../fetch.js";
import { Deck } from "./Deck.js";

const deckCardsElement = document.getElementById("deck-cards");

class Cards {
    _img;
    _code;
    _deck;
    _playerCards = [];

    constructor(_deck) {
        this._deck = _deck;
    }

    // Paramètre: Id du deck utilisé.
    // Retour: Carte piochée.
    drawCardApi = async deckId => {
        const res = await secureFetch(
            `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
        );
        this.remainingCards = res.remainingCards;
        deckCardsElement.removeChild(
            deckCardsElement.getElementsByTagName('img')[deckCardsElement.getElementsByTagName('img').length - 1]
        );
        return res.cards[0];
    }

    showCard = card => {
        const cardDomElement = document.createElement("img")
        this._playerCards.push(card)
        cardDomElement.src = card.image;
        this.randomRotate(cardDomElement)
        document.getElementById("player-cards").appendChild(cardDomElement)
    }

    randomRotate = cardDomElement => {
        cardDomElement.style.transform = "rotate(" + this.randomIntFromInterval(-45, 45) + "deg)"
    }

    randomIntFromInterval = (min, max) => { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    get img() {
        return this._img;
    };

    get code() {
        return this._code;
    };

    get deck() {
        return this._deck;
    };
}