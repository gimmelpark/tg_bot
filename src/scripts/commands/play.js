const messages = require("../../assets/messages.constant.js");
const $f = require("../shared.js");

const options = {
  reply_markup: require('../../assets/form.constant.js').gameStart
}

const handler = async function(msg, bot, data) {
  if (data.gameData.status === 'none') {
    data.gameData.status = 'prepare'
    data.gameData.players = []
    data.cbHandlers['startGame'] = require('../cbHandlers/startGame.js').handler
    data.cbHandlers['addPlayer'] = require('../cbHandlers/addPlayer.js').handler
    data.cbHandlers['cancelGame'] = require('../cbHandlers/cancelGame.js').handler
    const botMsg = await bot.sendMessage(msg.chat.id, messages.gameAddPlayers, options)
    data.gameData.startMsgId = botMsg.message_id
  } else {
    await bot.sendMessage(msg.chat.id, messages.gameAlreadyStarted)
  }
}

module.exports = {
  handler
}