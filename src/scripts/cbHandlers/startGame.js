const messages = require("../../assets/messages.constant.js");
const $f = require("../shared.js");

const handler = async function(msg, bot, data) {
  if (data.gameData.status === 'prepare') {
    if (data.gameData.players.length >= 2) {
      const options = {
        chat_id: msg.message.chat.id,
        message_id: data.gameData.startMsgId,
        reply_markup: require('../../assets/form.constant.js').gameChoice
      }
      data.gameData.status = 'started'
      delete data.cbHandlers['startGame']
      delete data.cbHandlers['addPlayer']
      delete data.cbHandlers['cancelGame']
      data.cbHandlers['gameChoice-stone'] = require('./gameChoice.js').handler
      data.cbHandlers['gameChoice-scissors'] = require('./gameChoice.js').handler
      data.cbHandlers['gameChoice-paper'] = require('./gameChoice.js').handler
      $f.printLog('game started', data.gameData)
      await bot.editMessageText(
        'Сделайте свой ход. Ожидаем игроков: \n' + data.gameData.players.map(el => el.username).join('\n'),
        options
      )
      await bot.sendMessage(msg.message.chat.id, messages.gameStarted)
    } else {
      await bot.sendMessage(msg.message.chat.id, messages.gameFewPlayers)
    }
  }
}

module.exports = {
  handler
}