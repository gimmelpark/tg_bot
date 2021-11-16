const messages = require("../../assets/messages.constant.js");

const handler = async function (msg, bot, {spamData}) {
  const chatId = msg.chat.id
  await bot.sendMessage(chatId, messages.spamText)
  bot.onText(/^[A-Za-zА-Яа-я]+$/gm, (msg) => {
    bot.removeTextListener(/^[A-Za-zА-Яа-я]+$/gm)
    const interval = setInterval(() => {
      bot.sendMessage(chatId, msg.text)
    }, 1000)
    spamData.push({chatId, text: msg.text, interval})
  })
}

module.exports = {
  handler
}