(async () => {
  const startGameElement = document.getElementById("btn-start");
  const drawCardElement = document.getElementById("btn-draw");
  const stopGameElement = document.getElementById("btn-stop");
  const informationElement = document.getElementById("gameResult");
  const scoreElement = document.getElementById("score");

  let scoreValue = 0;
  let deckId = null;
  let inProgress = false;

  // Activation/Désactivation des boutons
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

  startGameElement.addEventListener("click", async () => {
    startGame();
  });

  drawCardElement.addEventListener("click", async () => {
    drawCard();
  });

  stopGameElement.addEventListener("click", async () => {
    stopGame();
  });

  // Tirer une carte et ajouter la valeur au score
  const drawCard = async () => {
    let cardCode = await drawCardApi(deckId);
    scoreValue += await computeScore(cardCode, scoreValue);
    scoreElement.textContent = scoreValue;
    console.log("Current score : " + scoreValue);
    if (scoreValue > 21) {
      gameIsOver();
    }
  };

  // Arrêter la partie (clic sur bouton "stop")
  const stopGame = async () => {
    await drawCard();
    informationElement.textContent = scoreValue > 21 ? "You won !" : "You lost";
    inProgress = false;
    initButtons(inProgress);
  };

  // Arrêter la partie (score >= 21)
  const gameIsOver = () => {
    informationElement.textContent =
      scoreValue == 21 ? "You won !" : "You lost";
    inProgress = false;
    initButtons(inProgress);
  };

  // Lancer une nouvelle partie.
  const startGame = async () => {
    scoreValue = 0;
    deckId = await getDeckId();
    scoreElement.textContent = 0;
    informationElement.textContent = "Game in progress...";
    inProgress = true;
    initButtons(inProgress);
  };

  // Paramètre : Code de la carte (2S,JD,KC,AH, ...). 
  // Retour : Valeur de la carte passée en paramètre (2S => 2, JD => 10, KC => 10, AH => 0, ...).
  let computeScore = (cardCode) => {
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

  // Retour : Id du deck.
  let getDeckId = async () => {
    let deckId = fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
      .then((res) => res.json())
      .then((res) => {
        return res.deck_id;
      });
    return deckId;
  }

  // Paramètre: Id du deck utilisé. 
  // Retour: Carte piochée.
  let drawCardApi = (deckId) => {
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