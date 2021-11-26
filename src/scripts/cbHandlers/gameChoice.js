const messages = require("../../assets/messages.constant.js");
const $f = require("../shared.js");

const handleResults = (players) => {
  const choices = {}
  players.forEach(el => {
    choices[el.choice] = choices[el.choice] ? [...choices[el.choice], el] : [el]
  })
  const keys = Object.keys(choices)
  if (keys.length !== 2) return null
  if (!keys.includes('stone')) return choices['scissors']
  if (!keys.includes('paper')) return choices['stone']
  return choices['paper']
}

const emojiEnum = {
  'stone': '👊',
  'scissors': '✌️',
  'paper': '🖐',
}

const handler = async function(msg, bot, data) {
  if (data.gameData.status === 'started') {
    const player = data.gameData.players.find(el => el.id === msg.from.id)
    if (player !== undefined) {
      const options = {
        chat_id: msg.message.chat.id,
        message_id: data.gameData.startMsgId,
        reply_markup: require('../../assets/form.constant.js').gameChoice
      }
      player.choice = msg.data.split('-')[1]
      $f.printLog('choice in game', data.gameData.players)
      await bot.editMessageText(
        'Сделайте свой ход. Ожидаем игроков: \n' + data.gameData.players
          .filter(el => el.choice === null).map(el => el.username).join('\n'),
        options
      )
      if (data.gameData.players.every(el => el.choice !== null)) {
        await bot.editMessageText('Все игроки готовы...', options)
        setTimeout(async () => {
          try {
            data.gameData.status = 'none'
            delete data.cbHandlers['gameChoice-stone']
            delete data.cbHandlers['gameChoice-scissors']
            delete data.cbHandlers['gameChoice-paper']
            const results = handleResults(data.gameData.players)
            $f.printLog('game results', results)
            const resultString = `Игра завершена. ${results ?
              'Победители: \n' + results.map(el => `${el.username} ${emojiEnum[el.choice]}`).join('\n'):
              'Победителей нет'
            }`
            await bot.editMessageText(resultString, {
              chat_id: msg.message.chat.id,
              message_id: data.gameData.startMsgId,
            })
            await bot.sendMessage(msg.message.chat.id, messages.gameEnd)
          } catch (e) {
            $f.errorHandler(e)
          }
        }, 1500)
      }
    }
  }
}

module.exports = {
  handler
}