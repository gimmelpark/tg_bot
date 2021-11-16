const messages = require("../../assets/messages.constant.js");

const handler = async function(msg, bot) {
  const chatId = msg.chat.id
  await bot.sendMessage(chatId, messages.start)
}

module.exports = {
  handler
}