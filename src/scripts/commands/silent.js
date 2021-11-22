const messages = require("../../assets/messages.constant.js");
const $f = require("../shared.js");

const handler = async function(msg, bot, {spamData}) {
  spamData.forEach(el => {
    clearInterval(el.interval)
  })
  spamData = []
  await bot.sendMessage(msg.chat.id, messages.silent)
  $f.printLog(`stop spam in chat ${msg.chat.id}`, spamData)
}

module.exports = {
  handler
}