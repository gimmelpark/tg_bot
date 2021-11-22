const messages = require("../../assets/messages.constant.js");
const $f = require("../shared.js");

const handler = async function(msg, bot, data) {
  if (data.gameData.status === 'prepare') {
    const options = {
      chat_id: msg.message.chat.id,
      message_id: data.gameData.startMsgId,
      reply_markup: require('../../assets/form.constant.js').gameStart
    }

    if (data.gameData.players.every(el => el.id !== msg.from.id)) {
      const newPlayer = {
        id: msg.from.id,
        username: msg.from.username,
      }
      data.gameData.players.push(newPlayer)
      $f.printLog('add player', newPlayer)
      await bot.editMessageText(
        messages.gameAddPlayers + data.gameData.players.map(el => el.username).join('\n'),
        options
      )
      await bot.sendMessage(msg.message.chat.id, `Добавлен игрок ${msg.from.username}`)
    } else {
      await bot.sendMessage(msg.message.chat.id, `Игрок ${msg.from.username} уже в игре`)
    }
  }
}

module.exports = {
  handler
}