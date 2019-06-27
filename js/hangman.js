const startGameBtn = document.querySelector('.btn--active');
const overlayDiv = document.querySelector('.hangman__overlay');
const missedContainer = document.querySelector('.missed-container');
const missedLetters = document.querySelector('.missed-container__letters');
const lettersList = document.querySelector('.letters-list');
const hangmanGameInfo = document.querySelector('.hangman__game-info');
const HangmanGame = {
  wrongLetters: [],
  words: ["gainful", "finger", "savory", "swing", "type", "insidious", "protect", "didactic", "zinc", "rake",
    "indicate", "slink", "view", "tasty", "distribute", "screeching", "dirt",
    "adjoining", "hobbies", "refer"
  ],
  word: '',
  guessedLetters: [],
  guesses: 0,
  isStarted: false,
};

const getRandomWord = () => {
  const {
    words
  } = HangmanGame;
  return words[Math.floor(Math.random() * words.length)];
};

const renderLettersFromWord = () => {
  const word = getRandomWord();
  HangmanGame.word = word.toUpperCase();

  const fragment = document.createDocumentFragment();
  const lettersList = document.querySelector('.letters-list');

  const letter = [...word].forEach(letter => {
    const listItem = document.createElement('li');
    const letterItem = document.createElement('input');
    listItem.classList.add('letters-list__word');
    letterItem.classList.add('letters-list__letter');
    letterItem.dataset.word = 'letter';
    letterItem.disabled = 'disabled';
    listItem.appendChild(letterItem);
    fragment.appendChild(listItem);
  });

  lettersList.appendChild(fragment);
};

const handleKeyboard = e => {
  if (!HangmanGame.isStarted || HangmanGame.guessedLetters.includes(e.key.toUpperCase())) {
    return;
  }
  e.preventDefault();
  const letter = e.key.toUpperCase();
  const regexLetter = /^[a-zA-Z]*$/;
  const isLetter = letter.match(regexLetter) && letter !== 'ENTER' ? checkAnswer(letter) : false;
}

const checkAnswer = letter => {
  const hangmanBodyParts = document.querySelectorAll('.wrapper .js-hidden');
  const fields = [...document.querySelectorAll('[data-word=letter]')];
  const {
    word,
    wrongLetters,
    guessedLetters,
    guesses
  } = HangmanGame;
  if (word.includes(letter)) {
    for (let i = 0; i < word.length; i++) {
      if (word[i].includes(letter)) {
        fields[i].value = letter;
        if (guesses === word.length - 1) {
          gameResult('YOU WON!')

        }
        HangmanGame.guesses++;
        guessedLetters.push(letter);
      }
    }

  } else if (!word.includes(letter) && !wrongLetters.includes(letter)) {
    HangmanGame.wrongLetters.push(letter);
    drawHangmanBodyParts();
    renderMissedLetters();

    if (hangmanBodyParts.length - 1 < 1) {
      gameResult('GAME OVER :(');
    }
  }
}

const drawHangmanBodyParts = () => {
  const hangmanBodyParts = document.querySelectorAll('.wrapper .js-hidden');
  if (hangmanBodyParts.length > 0) {
    hangmanBodyParts[0].classList.remove('js-hidden');
  }
}

const renderMissedLetters = () => {
  missedContainer.classList.remove('js-hidden');
  const letters = HangmanGame.wrongLetters.map(missedLetter => {
    return missedLetter;
  })
  missedLetters.textContent = letters;
}

const gameResult = (gameInfo) => {
  overlayDiv.classList.remove('js-overlay');
  hangmanGameInfo.textContent = gameInfo;
  startGameBtn.textContent = 'START NEW GAME'
  HangmanGame.isStarted = false;
}

const resetGame = () => {
  const hangmanBodyParts = document.querySelectorAll('[data-body]');
  const disabledLetters = document.querySelectorAll('.letters-list [data-disabled]');

  overlayDiv.classList.add('js-overlay');
  HangmanGame.guesses = 0;
  HangmanGame.wrongLetters = [];
  HangmanGame.guessedLetters = [];
  lettersList.textContent = '';
  missedLetters.textContent = '';
  disabledLetters.forEach(letter => lettersList.appendChild(letter));
  hangmanBodyParts.forEach(el => el.classList.add('js-hidden'));
  missedContainer.classList.remove('js-hidden');
  HangmanGame.isStarted = !HangmanGame.isStarted;
}
const startGame = (e) => {
  resetGame();
  renderLettersFromWord();
}

window.addEventListener('keypress', e => handleKeyboard(e));
startGameBtn.addEventListener('click', startGame);