const messages = require("../../assets/messages.constant.js");
const $f = require('../shared.js')

const handler = async function (msg, bot, {spamData}, allData) {
  await bot.sendMessage(msg.chat.id, messages.stop)
  spamData.forEach(el => {
    clearInterval(el.interval)
  })
  spamData = []
  allData.splice(allData.findIndex(el => el.chatId === msg.chat.id), 1)
  $f.printLog(`stop running in chat ${msg.chat.id}`, allData)
}

module.exports = {
  handler
}