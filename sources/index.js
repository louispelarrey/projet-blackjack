(async () => {
  const startGameElement = document.getElementById("btn-start");
  const drawCardElement = document.getElementById("btn-draw");
  const stopGameElement = document.getElementById("btn-stop");
  const informationElement = document.getElementById("gameResult");
  const scoreElement = document.getElementById("score");

  let scoreValue = 0;
  let deckId = null;
  let inProgress = false;

  const initButtons = (inProgress) => {
    if (inProgress) {
      drawCardElement.disabled = false;
      stopGameElement.disabled = false;
      startGameElement.disabled = true;
    } else {
      drawCardElement.disabled = true;
      stopGameElement.disabled = true;
      startGameElement.disabled = false;
    }
  };

  const drawCard = async () => {
    let cardCode = await drawCardApi(deckId);
    scoreValue += await computeScore(cardCode, scoreValue);
    scoreElement.textContent = scoreValue;
    console.log("Current score : " + scoreValue);
    if (scoreValue > 21) {
      gameOver();
    }
  };

  const stopGame = async () => {
    await drawCard();
    informationElement.textContent = scoreValue > 21 ? "You won !" : "You lost";
    inProgress = false;
    initButtons(inProgress);
  };

  const gameOver = () => {
    informationElement.textContent =
      scoreValue == 21 ? "You won !" : "You lost";
    inProgress = false;
    initButtons(inProgress);
  };

  const startGame = async () => {
    scoreValue = 0;
    deckId = await getDeckId();
    scoreElement.textContent = 0;
    informationElement.textContent = "Game in progress...";
    inProgress = true;
    initButtons(inProgress);
  };

  async function computeScore(cardCode) {
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
  }

  startGameElement.addEventListener("click", async () => {
    startGame();
  });

  drawCardElement.addEventListener("click", async () => {
    drawCard();
  });

  stopGameElement.addEventListener("click", async () => {
    stopGame();
  });

  async function getDeckId() {
    let deckId = fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
      .then((res) => res.json())
      .then((res) => {
        return res.deck_id;
      });
    return deckId;
  }

  async function drawCardApi(deckId) {
    let result = fetch(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    )
      .then((res) => res.json())
      .then((res) => {
        return res.cards[0].code;
      });
    return result;
  }
})();