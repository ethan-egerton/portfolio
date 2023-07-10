import * as tools from './tools.mjs';
import * as ui from './ui.mjs';

export let currentLobby;
let isHost;

async function getLobbies() {
  const response = await fetch('/getActiveLobbies');
  const responseJson = await response.json();
  return responseJson.lobbies;
}

export async function generateLobby() {
  const lobbies = getLobbies();
  do {
    currentLobby = tools.charGen(7).toString;
  } while (lobbies.includes(currentLobby));
  const lobbyCreated = await fetch(`/createLobby/${currentLobby}`);
  if (lobbyCreated.status === 400) {
    ui.loadMultiplayerMenu(true);
  }
}

export async function joinLobby(id) {
  const response = await fetch(`/joinLobby/${id}`);
  if (response.status === 200) {
    currentLobby = id;
    isHost = false;
    ui.loadMultiplayerMenu(false);
  } else {
    return false;
  }
}

async function getGameData(lobby) {
  try {
    const response = await fetch(`/getGameData/${lobby}`);
    const responseJson = response.json();
    console.log(responseJson);
  } catch (error) {
    return false;
  }
}

function sendGameData(lobby, player, data) {
  return true;
}