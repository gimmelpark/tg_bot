const messages = require("../../assets/messages.constant.js");

const handler = async function(msg, bot, {spamData}) {
  const chatId = msg.chat.id
  spamData
    .filter(el => el.chatId === chatId)
    .forEach(el => clearInterval(el.interval))

  spamData = spamData.filter(el => el.chatId !== chatId);

  await bot.sendMessage(chatId, messages.silent)
}

module.exports = {
  handler
}