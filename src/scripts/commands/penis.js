const messages = require("../../assets/messages.constant.js");
const $f = require("../shared.js");

const handler = async function(msg, bot) {
  const length = Math.floor(Math.random() * 10)
  $f.printLog(`sending penis with length ${length}`)
  await bot.sendSticker(msg.chat.id, 'CAACAgIAAxkBAAEDValhmrdm1Lp6RHliT1PUKQ54y4sTEwACKwIAArI71QMk5g-yd00GwyIE')
  for (let i = 0; i < length; i++) {
    await bot.sendSticker(msg.chat.id, 'CAACAgIAAxkBAAEDVa9hmrhWD0mfXIUNhih_DcDfZK_27QACLQIAArI71QOhD2CRrC6QdSIE')
  }
  await bot.sendSticker(msg.chat.id, 'CAACAgIAAxkBAAEDVbFhmrhj0RzWvyTEzYhDtI4gKzIF2gACLwIAArI71QPuxWoGta30JCIE')
}

module.exports = {
  handler
}