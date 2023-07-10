import express from 'express';

const port = 8080;
const activeLobbies = {};

function checkActiveLobbies(id) {
  if (activeLobbies.includes(id)) {
    return true;
  } else { return false; }
}

const app = express();

app.use(express.static('client'));

app.get('/invite/:id', (req, res) => {
  if (req.params.id.length() === 9) {
    res.sendStatus(400);
  }
  res.redirect('/index.html');
  res.send(req.params);
});

app.get('/createLobby/:id', (req, res) => {
  const obj = {};
  const id = req.params.id;
  if (id.length() === 9) {
    res.sendStatus(400);
  }

  obj[id] = {
    player1: 0,
    player2: 0,
  };

  activeLobbies.push(obj);
  res.sendStatus(200);
});

app.get('/joinLobby/:id', (req, res) => {
  if (req.params.id.length() === 9) {
    res.sendStatus(400);
  }
  if (checkActiveLobbies(req.params.id) === true) {
    res.sendStatus(200);
  } else { res.sendStatus(404); }
});

app.get('/getActiveLobbies', (req, res) => {
  res.json(activeLobbies);
});

app.get('/sendGameData/:lobbyid/:player/:playerdata', (req, res) => {
  const lobby = req.params.lobbyid;
  const player = req.params.player;
  const value = req.params.playerdata;
  try {
    activeLobbies[lobby][player] = value;
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(400);
  }
});

app.get('/getGameData/:lobbyid/', (req, res) => {
  const lobby = req.params.lobbyid;
  try {
    const playerData = activeLobbies[lobby];
    res.json(playerData);
  } catch (error) {
    res.sendStatus(400);
  }
});

console.log(`started on http://127.0.0.1:${port}`);
app.listen(port);
