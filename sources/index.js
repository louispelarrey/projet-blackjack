(async () => {
  const drawCardElement = document.getElementById("btn-draw");
  const stopGameElement = document.getElementById("btn-stop");
  const informationElement = document.getElementById("gameResult");
  const scoreElement = document.getElementById("score");
  let stop = false;
  let scoreValue = null;
  let deckId = await getDeckId();
  drawCardElement.addEventListener("click", async () => {
    stop = false;
    scoreValue = scoreElement.textContent;
    let cardCode = await drawCard(deckId);
    let score = await computeScore(cardCode, scoreValue);
    scoreElement.textContent = score;
    informationElement.textContent = await gameResult(score, stop);
  });
  stopGameElement.addEventListener("click", async () => {
    stop = true;
    scoreValue = scoreElement.textContent;
    let cardCode = await drawCard(deckId);
    let score = await computeScore(cardCode, scoreValue);
    scoreElement.textContent = score;
    console.log(stop);
    informationElement.textContent = await gameResult(score, stop);
  });
})();

async function gameResult(score, stop) {
    if (stop == true) {
        if (score > 21) {
            return "You won ! :D";
        } else {
            return "You lost... :(";
        }
    } else {
        if (score == 21) {
            return "You won ! :D";
        } else if (score > 21) {
            return "You lost";
        } else {
            return "Game in progress."
        }
    }
}

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