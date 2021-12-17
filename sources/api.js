function getNewDeck() {
    fetch('https://deckofcardsapi.com/api/deck/new/')
    .then(response => response.json())
    .then(data => console.log(data))
}

function drawNCards(deckId, numberOfCards) {
    fetch('https://deckofcardsapi.com/api/deck/' + deckId + '/draw/?count=' + numberOfCards)
    .then(response => response.json())
    .then(data => console.log(data))
}

function shuffle(deckId) {
    fetch('https://deckofcardsapi.com/api/deck/' + deckId + '/shuffle/')
    .then(response => response.json())
    .then(data => console.log(data))
}