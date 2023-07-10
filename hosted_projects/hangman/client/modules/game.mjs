import * as ui from './ui.mjs';
import * as tools from './tools.mjs';

let splitWord = [];
let playerScore = 0;
let correctLetters = 0;
let wordLength = 0;
let usedLetter = [];
const hangmanDisplay = document.querySelector('#hangman-display');

// Letter Validation
export function checkLetters(event = null, input = null) {
  // Cycles through every letter in array splitWord to check if element
  // matches the letter.
  // If event is null it means that it was a keypress that used the function
  let letter;
  let button;
  if (event != null) {
    letter = event.currentTarget.textContent;
    button = event.currentTarget;
  } else {
    letter = input;
    button = document.querySelector(`#keyboard-${letter}`);
  }
  let foundLetter = false;
  // Checks if the letter has already been used
  if (usedLetter.includes(letter)) {
    return;
  }
  // Cycles through the letters, if none found, adds score
  for (let i = 0; i < wordLength; i++) {
    if (letter === splitWord[i]) {
      correctLetters += 1;
      button.classList.add('btn-correct');
      document.querySelector('#letter-' + i).textContent = splitWord[i];
      foundLetter = true;
      button.removeEventListener('click', checkLetters);
    }
  }
  if (foundLetter === false) {
    button.classList.add('btn-wrong');
    button.removeEventListener('click', checkLetters);
    playerScore += 1;
  }
  // adds the used letter to usedLetter so it cannot be used again
  usedLetter.push(letter);
  canvasBuild(playerScore);

  // when the correct amount of letters equals to the length, winstate
  if (correctLetters === wordLength) { ui.endDisplay(true); }
}

// Multiplayer letter handler
export function inputLetters(event = null, input = null) {
  let letter;
  if (event != null) {
    letter = event.currentTarget.textContent;
    console.log(letter);
  } else {
    letter = input;
    console.log(letter);
  }
}

function randomWordGen() {
  try {
    const wordIndex = Math.floor(Math.random() * ui.wordArray.length);
    return ui.wordArray[wordIndex];
  } catch {
    console.log('could not locate array');
  }
}

export function startGame() {
  ui.startToggle();
  ui.generateKeyboard();
  ui.keyboardEventCheck();
  hangmanDisplay.src = '../assets/images/0.png';
  const word = randomWordGen();
  let spaceCounter = 0;
  // TODO: REMOVE THIS WHEN DONE
  console.log(word);
  playerScore = 0;
  correctLetters = 0;
  usedLetter = [];

  canvasBuild(playerScore);

  // Set letters in word display
  // Loops through the letters, if finds space, adds space
  splitWord = word.split('');
  for (let i = 0; i < splitWord.length; i++) {
    if (splitWord[i] === ' ') {
      spaceCounter += 1;
      document.querySelector('#letter-display').append(tools.elementCreator('span', '', 'space', String.fromCharCode(32)));
    } else {
      document.querySelector('#letter-display').append(tools.elementCreator('span', 'letter-' + (i - spaceCounter), 'letter', String.fromCharCode(160)));
    }
  }

  for (let i = 0; i < splitWord.length; i++) {
    const element = splitWord[i];
    if (element === ' ') { splitWord.splice(i, 1); }
  }
  wordLength = splitWord.length;
}

function canvasBuild(score) {
  hangmanDisplay.src = `../assets/images/${score}.png`;
  if (score === 11) { ui.endDisplay(false); }
}
