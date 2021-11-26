const messages = require("../../assets/messages.constant.js");
const $f = require('../shared.js')

const handler = async function (msg, bot, {spamData}) {
  let spamText = msg.text.slice('/start'.length)
  if (spamText.length) {
    await bot.sendMessage(msg.chat.id, messages.spam)
  } else {
    await bot.sendMessage(msg.chat.id, messages.spamIncorrect)
    spamText = `huy`
  }
  spamData.push({
    interval: setInterval(async() => {
      try {
        await bot.sendMessage(msg.chat.id, spamText)
      } catch (e) {
        $f.errorHandler(e)
      }
    }, 1000),
    text: spamText,
  })
  $f.printLog(`spam with message ${spamText}`, spamData)
}

module.exports = {
  handler
}