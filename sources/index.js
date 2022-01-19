//import { computeScore } from "./score";

(async () => {
  let deckId = await getDeckId();
  let carte = await drawCard(deckId);
  console.log(carte);
})();

async function getDeckId() {
  let deckId = fetch(`https://deckofcardsapi.com/api/deck/new/`)
    .then((res) => res.json())
    .then((response) => {
      return response.deck_id;
    });
  return deckId;
}

async function drawCard(deckId) {
  let result = fetch(
    `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
  )
    .then((res) => res.json())
    .then((res) => {
      return res.cards[0].code;
    });
  return result;
}
