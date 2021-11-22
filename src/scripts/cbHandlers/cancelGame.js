const messages = require("../../assets/messages.constant.js");
const $f = require("../shared.js");

const handler = async function(msg, bot, data) {
  if (data.gameData.status === 'prepare') {
    const options = {
      chat_id: msg.message.chat.id,
      message_id: data.gameData.startMsgId,
      reply_markup: require('../../assets/form.constant.js').gameStart
    }

    const existIndex = data.gameData.players.findIndex(el => el.id === msg.from.id)
    if (existIndex !== -1) {
      data.gameData.players.splice(existIndex, 1)
      $f.printLog(`deleted player ${msg.from.id}`)
      await bot.editMessageText(
        messages.gameAddPlayers + data.gameData.players.map(el => el.username).join('\n'),
        options
      )
      await bot.sendMessage(msg.message.chat.id,`Удален игрок ${msg.from.username}`)
    } else {
      data.gameData.status = 'none'
      data.gameData.players = []
      delete data.cbHandlers['startGame']
      delete data.cbHandlers['addPlayer']
      delete data.cbHandlers['cancelGame']
      await bot.editMessageText('[тут могла быть игра]', {
        chat_id: msg.message.chat.id,
        message_id: data.gameData.startMsgId,
      })
      await bot.sendMessage(msg.message.chat.id, messages.gameCanceled)
    }
  }
}

module.exports = {
  handler
}