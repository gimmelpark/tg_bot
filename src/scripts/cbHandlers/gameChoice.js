const messages = require("../../assets/messages.constant.js");
const $f = require("../shared.js");

const handler = async function(msg, bot, data) {
  if (data.gameData.status === 'started') {
    await bot.sendMessage(msg.message.chat.id, 'дальше пока не работает')
  }
}

module.exports = {
  handler
}