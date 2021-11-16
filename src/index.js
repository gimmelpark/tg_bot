
const TelegramBot = require('node-telegram-bot-api');

require('dotenv').config();

const bot = new TelegramBot(process.env.BOT_TOKEN, {polling: true});

const messages = require('./assets/messages.constant.js');

const errorHandler = (err) => {
  console.log('ERROR: ' + err)
}

async function start(){
  try {
    let spamData = []

    const botData = {
      spamData,
    }

    const botCommands = [
      {command: 'start', description: 'итак все ясно', handler: require('./scripts/commands/start.js').handler},
      {command: 'spam', description: 'спамить', handler: require('./scripts/commands/spam.js').handler},
      {command: 'silent', description: 'остановить спам', handler: require('./scripts/commands/silent.js').handler},
    ]

    await bot.setMyCommands(botCommands
      .filter(el => el.description)
      .map(el => ({command: el.command, description: el.description})))

    bot.onText(/^\/\w+$/gm, async (msg) => {
      const existCommand = botCommands.find(el => '/' + el.command === msg.text)
      if (existCommand !== undefined) {
        await existCommand.handler(msg, bot, botData)
      } else {
        await bot.sendMessage(msg.chat.id, messages.commandNotFound)
      }
    })

  } catch (e) {
    errorHandler(e)
  }
}
start()
