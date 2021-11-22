
const TelegramBot = require('node-telegram-bot-api');

require('dotenv').config();

const bot = new TelegramBot(process.env.BOT_TOKEN, {polling: true});

const messages = require('./assets/messages.constant.js');

const $f = require('./scripts/shared.js')

const initBot = async (commands) => {
  await bot.setMyCommands(commands
    .filter(el => el.description)
    .map(el => ({command: el.command, description: el.description})))
}

const startBot = async () => {
  try {
    const botCommands = [
      {command: 'start', description: 'запустить бота'},
      {command: 'spam', description: 'спамить', handler: require('./scripts/commands/spam.js').handler},
      {command: 'silent', description: 'остановить спам', handler: require('./scripts/commands/silent.js').handler},
      {command: 'penis', description: 'пенис', handler: require('./scripts/commands/penis.js').handler},
      {command: 'play', description: 'камень ножницы бумага', handler: require('./scripts/commands/play.js').handler},
      // {command: 'test', description: 'test', handler: (msg) => { $f.printLog('test', msg) } },
      {command: 'stop', description: 'остановить бота', handler: require('./scripts/commands/stop.js').handler}
    ]

    await initBot(botCommands)

    const botData = []

    bot.on('message', async (msg) => {
      try {
        $f.printLog('input message', msg)

        let thisBotData = botData.find(el => el.chatId === msg.chat.id)

        if (msg.text === '/start' || msg.text === '/start@' + process.env.BOT_NAME) {
          if (thisBotData === undefined) {
            const newData = {
              chatId: msg.chat.id,
              waitingCommand: true,
              cbHandlers: {},
              spamData: [],
              gameData: {
                players: [],
                status: 'none',
                startMsgId: undefined,
              },
            }
            botData.push(newData)
            $f.printLog('started new chat', newData)
            await bot.sendMessage(msg.chat.id, messages.start)
          } else {
            await bot.sendMessage(msg.chat.id, messages.alreadyStarted)
          }
        } else if (thisBotData !== undefined && thisBotData.waitingCommand) {
          const command = botCommands
            .find(el => new RegExp(`^/${el.command}(?:@${process.env.BOT_NAME})?(?: .*)*$`).test(msg.text))
          if (command !== undefined) {
            $f.printLog(`run command in chat ${msg.chat.id}`, command)
            if (typeof command.handler === 'function') {
              try {
                thisBotData.waitingCommand = false
                await command.handler(msg, bot, thisBotData, botData)
                thisBotData.waitingCommand = true
              } catch (e) {
                $f.errorHandler(e)
              }
            }
          } else {
            await bot.sendMessage(msg.chat.id, messages.commandNotFound)
          }
        }
      } catch (e) {
        $f.errorHandler(e)
      }

    })

    bot.on('callback_query', async msg => {
      try {
        $f.printLog('button click', msg)
        let thisBotData = botData.find(el => el.chatId === msg.message.chat.id)
        if (thisBotData && typeof thisBotData.cbHandlers[msg.data] === 'function') {
          await thisBotData.cbHandlers[msg.data](msg, bot, thisBotData, botData)
        }
      } catch (e) {
        $f.errorHandler(e)
      }
    })

    $f.printLog('start run' )
  } catch (e) {
    $f.errorHandler(e)
  }

}
startBot()



/*



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
*/


