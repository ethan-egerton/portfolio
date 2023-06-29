import * as commands from "./commands.mjs";
import { userInput, clearContainer, sleep } from "./io.mjs";

let capslock = false

const lowercaseKeyDict = {
  "Space": " ",
  "Unidentified": "",
  "Pause": "",
  "Tab": "   ",
  "NumLock": "",
  "ControlLeft": "",
  "ControlRight": "",
  "AltRight": "",
  "AltLeft": "",
  "Lang1": "",
  "Lang2": "",
  "ArrowDown": "",
  "ArrowUp": "",
  "Delete": "",
  "Home": "",
  "End": "",
  "PageUp": "",
  "PageDown": "",
  "OSRight": "",
  "OSLeft": "",
  "Backquote": "`",
  "BracketLeft": "[",
  "BracketRight": "]",
  "Minus": "-",
  "Equal": "=",
  "Backslash": "\\",
  "Semicolon": ";",
  "Qoute": "'",
  "Comma": ",",
  "Period": ".",
  "Slash": "/",
};

const uppercaseKeyDict = {
  "Backquote": "¬",
  "1": "!",
  "2": `"`,
  "3": "£",
  "4": "$",
  "5": "%",
  "6": "^",
  "7": "&",
  "8": "*",
  "9": "(",
  "0": ")",
  "Minus": "_",
  "Equal": "+",
  "BracketLeft": "{",
  "BracketRight": "}",
  "Backslash": "|",
  "Semicolon": ":",
  "Qoute": "@",
  "Comma": "<",
  "Period": ">",
  "Slash": "?",
};

export async function keyPress(e) {
  e.preventDefault()
  let keyString = e.code;
  const inputElement = document.querySelector("#input");

  keyString = keyChecker(keyString);

  switch(keyString) {
    case "Enter":
      await executeCommand(inputElement.textContent);
      inputElement.id = "";
      await sleep(100);
      userInput();
      console.log("double ball")
      break;
    case "Backspace":
      inputElement.textContent = inputElement.textContent.slice(0,-1);
      break;
    case "CapsLock":
      capslock = (capslock ? false : true);
      break;
    case "ShiftLeft": case "ShiftRight":
      capslock = true;
      break;
    default:
      if (capslock) {keyString = keyString.toUpperCase();}
      inputElement.textContent = inputElement.textContent + keyString;
      break;
  }
}

export function keyUp(e) {
  let keyString = e.code;

  if (keyString == "ShiftLeft" || keyString == "ShiftRight") {
    capslock = false;
  }
}

function executeCommand(input) {
  console.log(input);
  input = input.toLowerCase();
  const split = input.split(" ")
  input = split[0];
  split.pop(0);
  const params = split;

  switch(input) {
    case "help":
      commands.help(params);
      break;
    case "clear":
      clearContainer();
      break;
    default:
      commands.unknown(input)
  }
}


function keyChecker(keyString) {
  if (keyString.startsWith('Key')) {
    keyString = keyString.slice(3).toLowerCase();
  }

  if (keyString.includes("Digit")) {
    keyString = keyString.slice(5);
  }

  if (keyString.includes("Numpad")) {
    keyString = keyString.slice(6);
  }

  if (keyString in uppercaseKeyDict && capslock) {
    keyString = uppercaseKeyDict[keyString];
  }

  if (keyString in lowercaseKeyDict) {
    keyString = lowercaseKeyDict[keyString];
  }

  return keyString;
}