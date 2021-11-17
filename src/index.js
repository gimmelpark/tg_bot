
const TelegramBot = require('node-telegram-bot-api');

require('dotenv').config();

const bot = new TelegramBot(process.env.BOT_TOKEN, {polling: true});

const messages = require('./assets/messages.constant.js');

const $f = require('./scripts/shared.js')

const botCommands = [
  {command: 'start', description: 'итак все ясно', handler: () => {} },
  {command: 'spam', description: 'спамить', handler: require('./scripts/commands/spam.js').handler},
  {command: 'silent', description: 'остановить спам', handler: require('./scripts/commands/silent.js').handler},
  {command: 'stop', description: 'остановить бота', handler: () => {} },
  {command: 'test', description: 'test', handler: (msg) => { $f.printLog('test', msg) } }
]

bot.setMyCommands(botCommands
  .filter(el => el.description)
  .map(el => ({command: el.command, description: el.description})))

const sessions = []

bot.onText(/\/start/, async msg => {
  const chatId = msg.chat.id
  await bot.sendMessage(chatId, messages.start)
  if (!sessions.find(el => el.chatId === chatId)) {
    $f.printLog(`new session with id: ${chatId}`)
    sessions.push({chatId, waitingCommand: true})
    start(chatId)
    $f.printLog('sessions', sessions)
  }
})

process.myBot = bot

async function start(chatId){
  try {
    const thisChatId = chatId

    let spamData = []

    const botData = {
      spamData,
    }

    bot.onText(/^\/\w+$/gm, async (msg) => {
      let sessionInd = sessions.findIndex(el => el.chatId === thisChatId)
      console.log(thisChatId)
      if (sessionInd !== -1 && thisChatId === msg.chat.id) {
        let session = sessions[sessionInd]

        $f.printLog('enter command', msg)
        $f.printLog('listener session', session)

        const existCommand = botCommands.find(el => '/' + el.command === msg.text)
        if (msg.text === '/stop') {

          spamData
            .filter(el => el.chatId === chatId)
            .forEach(el => clearInterval(el.interval))
          spamData = spamData.filter(el => el.chatId !== chatId);

          $f.printLog('delete session', session)
          sessions.splice(sessionInd, 1)
          await bot.sendMessage(thisChatId, messages.stop)
          $f.printLog('sessions', sessions)
          return
        }
        if (existCommand !== undefined) {
          session.waitingCommand = false
          await existCommand.handler(msg, bot, botData)
          session.waitingCommand = true
        } else {
          await bot.sendMessage(msg.chat.id, messages.commandNotFound)
        }
      }

    })

  } catch (e) {
    $f.errorHandler(e)
  }
}


