import * as game from './game.mjs';
import * as tools from './tools.mjs';
import * as multiplayer from './multiplayer.mjs';

export let wordArray = [];
let selectedMode = '';
let keyboardActive = false;

// Called when page loads
export function displayGame() {
  document.querySelector('.lds-roller').classList.add('display-none');
  document.querySelector('.app').classList.remove('display-none');
  document.querySelector('#btn-single').addEventListener('click', selectMode);
  document.querySelector('#btn-multi').addEventListener('click', selectMode);
  document.querySelector('#btn-settings').addEventListener('click', selectMode);
  document.querySelector('#btn-history').addEventListener('click', selectMode);
  document.querySelector('#btn-end').addEventListener('click', hideGameUI);
  document.querySelector('#create-lobby').addEventListener('click', multiplayer.generateLobby);
  document.querySelector('#confirm-id').addEventListener('click', enterLobby);

  clearControls();
  loadTopicButtons();
  toggleDisplay(false, ['#sidebar-bot', '#topic-display', '#topics']);
  singleplayerSelected();
}

export function toggleDisplay(hide, elements) {
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    if (hide === true) {
      document.querySelector(element).classList.add('display-none');
    } else {
      document.querySelector(element).classList.remove('display-none');
    }
  }
}

// Display handlers
export function startToggle() {
  clearWordDisplay();
  toggleDisplay(true, ['#topic-display', '#btn-single', '#btn-multi', '#btn-settings', '#btn-history', '#topics']);
  toggleDisplay(false, ['#letter-display', '#btn-end', '#keyboard']);
}

function clearControls() {
  toggleDisplay(true, ['#topic-display', '#topics', '#keyboard']);
  tools.removeElements(['.btn-topic']);
  removeKeyboard();
  if (document.querySelector('.btn-selected') !== null) {
    document.querySelector('.btn-selected').classList.remove('btn-selected');
  }
}

function hideGameUI(endState = false) {
  document.querySelector('#hangman-display').src = '../assets/images/11.png';
  removeKeyboard();
  toggleDisplay(false, ['#topic-display', '#btn-single', '#btn-multi', '#btn-settings', '#btn-history', '#topics']);
  toggleDisplay(true, ['#letter-display', '#btn-end', '#keyboard']);
  if (endState === true) {
    document.querySelector('#end-text').remove();
    document.querySelector('#return-button').remove();
  }
}

export function removeKeyboard() {
  const keyboard = document.querySelector('#keyboard');
  while (keyboard.firstChild) {
    keyboard.removeChild(keyboard.firstChild);
  }
}

function clearWordDisplay() {
  const element = document.querySelector('#letter-display');
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

// Dynamically loads available topics
function loadTopicButtons() {
  const topics = tools.fetchWordData();
  const topicNames = Object.getOwnPropertyNames(topics);
  for (let i = 0; i < topicNames.length; i++) {
    const topic = topicNames[i];
    document.querySelector('#topics').appendChild(tools.elementCreator('button', topic, 'btn btn-topic', topic.charAt(0).toUpperCase() + topic.slice(1)));
    document.querySelector(`#${topic}`).addEventListener('click', selectTopic);
  }
}

// Topic selection handler
export function selectTopic(event) {
  const topic = event.currentTarget.id;
  const wordsObj = tools.fetchWordData();
  wordArray = wordsObj[topic];
  game.startGame();
}

// Event for checking if the letter is part of the word
export function keyboardEventCheck() {
  Array.from(document.querySelectorAll('.btn-keyboard')).forEach(element => {
    element.addEventListener('click', game.checkLetters);
  });
  document.addEventListener('keydown', function (event) { keyboardPress(event, 'check'); });
}

// Event for handling basic keyboard input for multiplayer
export function keyboardEventInput() {
  Array.from(document.querySelectorAll('.btn-keyboard')).forEach(element => {
    element.addEventListener('click', game.inputLetters);
  });
  document.addEventListener('keydown', function (event) { keyboardPress(event, 'compInput'); });
}

// Dynamic menu selection
export function selectMode(event) {
  if (selectedMode !== '') {
    document.querySelector('.' + selectedMode + '-selected').classList.remove(selectedMode + '-selected');
  }
  selectedMode = event.currentTarget.id;
  switch (selectedMode) {
    case 'btn-single':
      clearControls();
      loadTopicButtons();
      toggleDisplay(false, ['#sidebar-bot', '#topic-display', '#topics']);
      singleplayerSelected();
      break;
    case 'btn-multi':
      clearControls();
      removeKeyboard();
      multiSelected();
      break;
    case 'btn-settings':
      clearControls();
      break;
    case 'btn-history':
      clearControls();
      break;
  }

  event.currentTarget.classList += ' ' + selectedMode + '-selected';
}

function singleplayerSelected() {
  document.querySelector('#btn-single').classList.add('btn-selected');
  toggleDisplay(true, ['#multiplayer']);
}

function multiSelected() {
  document.querySelector('#btn-multi').classList.add('btn-selected');
  toggleDisplay(true, ['#keyboard']);
  toggleDisplay(false, ['#multiplayer']);
}

export function generateKeyboard(backspace = false) {
  keyboardActive = true;
  document.addEventListener('keydown', keyboardPress);
  const qwerty = tools.qwertyString();
  const qwertyArray = qwerty.split('');
  const keyboard = document.querySelector('#keyboard');
  // button generation, when it hits a / it creates line break
  for (let i = 0; i < qwertyArray.length; i++) {
    if (qwertyArray[i] === '/') {
      keyboard.appendChild(tools.elementCreator('div', '', 'button-break'));
    } else {
      keyboard.appendChild(tools.elementCreator('button', 'keyboard-' + qwertyArray[i], 'btn btn-keyboard', qwertyArray[i]));
    }
  }
  if (backspace === true) {
    keyboard.appendChild(tools.elementCreator('button', 'keyboard-backspace', 'btn btn-keyboard', '←'));
  }
}

// Event for keydown presses
function keyboardPress(e, mode) {
  if (keyboardActive === false) {
    return;
  }
  let keyString = e.code;
  if (keyString.startsWith('Key')) {
    keyString = keyString.slice(3).toLowerCase();
    if (mode === 'check') {
      game.checkLetters(null, keyString);
    }
    if (mode === 'compInput') {
      game.inputLetters(null, keyString);
    }
  }
}

export function endDisplay(winStatus) {
  keyboardActive = false;
  document.querySelector('#btn-end').classList.add('display-none');
  document.querySelectorAll('.btn-keyboard').forEach(element => {
    element.removeEventListener('click', game.checkLetters);
  });

  let displayText;
  if (winStatus === true) {
    displayText = 'YOU WIN!';
  } else {
    displayText = 'YOU LOSE!';
  }

  const sidebar = document.querySelector('.controls');
  const p = tools.elementCreator('p', 'end-text', 'end-text', displayText);
  const button = tools.elementCreator('button', 'return-button', 'btn btn-return', 'Return to menu');
  button.addEventListener('click', function () { hideGameUI(true); });

  sidebar.prepend(button);
  sidebar.prepend(p);
}

// Multiplayer event handlers
function enterLobby() {
  const input = document.querySelector('#lobby-id-input').textContent;
  multiplayer.joinLobby(input);
}

export function loadMultiplayerMenu(isHost) {
  toggleDisplay(true, ['#topic-display', '#btn-single', '#btn-multi', '#btn-settings', '#btn-history', '#topics', '.app-screen', '#multiplayer']);
  if (isHost === true) {
    document.querySelector('#lobby-code').textContent(multiplayer.currentLobby);
    toggleDisplay(false, ['#lobby-code-display']);
  } else {
    // show player waiting screen
  }
}
