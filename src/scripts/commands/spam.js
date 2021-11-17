const messages = require("../../assets/messages.constant.js");
const $f = require('../shared.js')

const handler = async function (msg, bot, {spamData}) {
  try {

    const chatId = msg.chat.id
    await bot.sendMessage(chatId, messages.spamText)

    // bot.on('message', (textMsg) => {
    //   if (chatId === textMsg.chat.id && /^[А-Яа-я\s\w]+$/gm.test(textMsg.text)) {
    //
    //     $f.printLog('spam text', textMsg)
    //
    //     const interval = setInterval(() => {
    //       bot.sendMessage(chatId, textMsg.text)
    //     }, 1000)
    //
    //     spamData.push({chatId, text: textMsg.text, interval})
    //
    //     $f.printLog('spam data', spamData)
    //   }
    //   bot.removeListener('message')
    // })

    console.log(bot === process.myBot)

    bot.onText(/^[А-Яа-я\s\w]+$/gm, (textMsg) => {

      $f.printLog('spam text', textMsg)

      if (chatId === textMsg.chat.id) {

        bot.removeTextListener(/^[А-Яа-я\s\w]+$/gm)

        const interval = setInterval(() => {
          bot.sendMessage(chatId, textMsg.text)
        }, 1000)

        spamData.push({chatId, text: textMsg.text, interval})

        $f.printLog('spam data', spamData)
      }

    })


  } catch (e) {
    $f.errorHandler(e)
  }
}

module.exports = {
  handler
}