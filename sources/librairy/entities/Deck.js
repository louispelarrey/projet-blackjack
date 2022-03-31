export { Deck };
import { secureFetch } from "../fetch.js";

class Deck {

    _deckId;
    _remainingCards;

    constructor () {
        this.initDeck()
        this.initDeckFront()
    }

    async initDeck() {
        const res = await secureFetch(
            `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`
        );
        this._deckId = res.deck_id;
        this._remainingCards = res.remaining;
    }

    initDeckFront() {
        for (let i = 0; i < 52; i++) {
            const cardDomElement = document.createElement("img")
            cardDomElement.src = "./img/card.png"
            cardDomElement.style.bottom = i + "px"
            document.getElementById("deck-cards").appendChild(cardDomElement)
        }
    }

    get deckId() {
        return this._deckId;
    };
}