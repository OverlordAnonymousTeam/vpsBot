const TOKEN = process.env.TELEGRAM_TOKEN || '5741412594:AAEcFk13M3P8iDRiMtTN9P9TjyIHrEWKeuU';
const gameName = process.env.TELEGRAM_GAMENAME || 'FSIN';

let url = process.env.URL || 'https://overlordanonymousteam.github.io/PRIVATE.FSIN.GAME';
const port = process.env.PORT || 8080;

const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const path = require('path');

const bot = new TelegramBot(TOKEN, { polling: true });
const app = express();

// Basic configurations

app.set('view engine', 'ejs');
if (url === 'https://overlordanonymousteam.github.io/PRIVATE.FSIN.GAME')

// Matches /start
bot.onText(/\/start/, function onPhotoText(msg) {
  bot.sendGame(msg.chat.id, gameName);
});

// Handle callback queries
bot.on('callback_query', function onCallbackQuery(callbackQuery) {
  bot.answerCallbackQuery(callbackQuery.id, { url });
});

// Render the HTML game
app.get('/', function requestListener(req, res) {
  res.sendFile(path.join(__dirname, 'game.html'));
});

// Bind server to port
app.listen(port, function listen() {
  console.log(`Server is listening at http://localhost:${port}`);
});