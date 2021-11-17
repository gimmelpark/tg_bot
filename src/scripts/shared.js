const errorHandler = (err) => {
  printLog('ERROR', err)
}

const printLog = (message, content) => {
  const timeStr = new Date().toLocaleString('ru-RU', {hour: '2-digit', minute: '2-digit', second: '2-digit'})
  console.log(`> ${timeStr} :: ${message? message: 'log'}`)
  console.log(content)
  console.log('> end log\n')
}

module.exports = {
  printLog,
  errorHandler,
}