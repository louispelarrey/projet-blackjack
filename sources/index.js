//import { computeScore } from "./score";

(async () => {
  const drawCardElement = document.getElementById("btn");
  const scoreElement = document.getElementById("score");
  let scoreValue = null;
  let deckId = await getDeckId();
  drawCardElement.addEventListener("click", async () => {
    scoreValue = scoreElement.textContent;
    console.log("Valeur avant d'avoir pioché : " + scoreValue);
    let cardCode = await drawCard(deckId);
    let score = await computeScore(cardCode, scoreValue);
    scoreElement.textContent = score;
  });
})();

async function getDeckId() {
  let deckId = fetch(`https://deckofcardsapi.com/api/deck/new/`)
    .then((res) => res.json())
    .then((res) => {
      return res.deck_id;
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

async function computeScore(cardCode, scoreValue) {
  let cardParameters = cardCode.split("");
  let cardValue = cardParameters[0];
  switch (cardValue) {
    case "A":
      return parseInt(scoreValue) + 0;
    case "J" || "Q" || "K":
      return parseInt(scoreValue) + 10;
    default:
      return parseInt(scoreValue) + parseInt(cardValue);
  }
}