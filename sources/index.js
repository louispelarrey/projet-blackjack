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

// Tirer une carte et ajouter la valeur au score
const drawCard = async () => {
  let cardCode = await drawCardApi(deckId);
  scoreValue += await computeScore(cardCode, scoreValue);
  scoreElement.textContent = scoreValue;
  if (scoreValue > 21) {
    gameIsOver();
  }
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

// Arrêter la partie (clic sur bouton "stop")
const stopGame = async () => {
  await drawCard();
  informationElement.textContent = scoreValue > 21 ? "You won !" : "You lost";
  inProgress = false;
  initButtons(inProgress);
};

// Arrêter la partie (score >= 21)
const gameIsOver = () => {
  informationElement.textContent = scoreValue == 21 ? "You won !" : "You lost";
  inProgress = false;
  initButtons(inProgress);
};

startGameElement.addEventListener("click", startGame);
drawCardElement.addEventListener("click", drawCard);
stopGameElement.addEventListener("click", stopGame);

// Paramètre : Code de la carte (2S,JD,KC,AH, ...).
// Retour : Valeur de la carte passée en paramètre (2S => 2, JD => 10, KC => 10, AH => 0, ...).
const computeScore = async (cardCode) => {
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

// Retour : Id du deck.
const getDeckId = () => {
  let deckId = secureFetch(
    `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`
  ).then((res) => {
    return res.deck_id;
  });
  return deckId;
};

// Paramètre: Id du deck utilisé.
// Retour: Carte piochée.
const drawCardApi = async (deckId) => {
  let result = secureFetch(
    `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
  ).then((res) => {
    return res.cards[0].code;
  });
  return result;
};

// Paramètre: URL (Appel API).
// Retour: Promesse.
let secureFetch = async (url) => {
  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error("Bad status code");
    }
    const hasContentType = response.headers.has("content-type");
    const isJson = response.headers
      .get("content-type")
      .startsWith("application/json");
    if (!hasContentType || !isJson) {
      throw new Error("Bad content");
    }
    return await response.json();
  } catch (error) {
    return Promise.reject(error);
  }
};
