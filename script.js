let container = document.getElementById("game-container");
let symbols = ['🐶', '🐱', '🐭', '🐹', '🐰'];
let selectedCards = [];
let matchedPairs = 0;

function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function flipCard(card) {
  if (card.classList.contains('matched') || selectedCards.indexOf(card) !== -1 || selectedCards.length === 2) {
    return;
  }

  card.textContent = card.dataset.symbol;
  selectedCards.push(card);

  if (selectedCards.length === 2) {
    setTimeout(checkForMatch, 500);
  }
}

function checkForMatch() {
  let card1 = selectedCards[0];
  let card2 = selectedCards[1];

  if (card1.dataset.symbol === card2.dataset.symbol) {
    matchedPairs++;
    card1.classList.add('matched');
    card2.classList.add('matched');
    if (matchedPairs === symbols.length) {
      setTimeout(function() { alert('Congratulations, you found all pairs!'); }, 100);
    }
  } else {
    card1.textContent = '';
    card2.textContent = '';
  }
  selectedCards = [];
}

function createBoard() {
  let shuffledSymbols = shuffle(symbols.concat(symbols)); 

  for (let i = 0; i < shuffledSymbols.length; i++) {
    let card = document.createElement("div");
    card.className = 'game-card';
    card.dataset.symbol = shuffledSymbols[i];
    card.onclick = function(cardCopy) {
      return function() {
        flipCard(cardCopy);
      };
    }(card);
    container.appendChild(card);
  }
}

createBoard();
