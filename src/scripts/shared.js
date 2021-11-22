const errorHandler = (err) => {
  printLog('ERROR', err, true)
}

const printLog = (message, content = '', error = false) => {
  const timeStr = new Date().toLocaleString('ru-RU', {hour: '2-digit', minute: '2-digit', second: '2-digit'})
  if (!error) {
    console.log(`> ${timeStr} :: ${message? message: 'log'}`)
    console.log(content)
    console.log('> end log\n')
  } else {
    console.error(`> ${timeStr} :: ${message? message: 'log'}`)
    console.error(content)
    console.error('> end log\n')
  }
}

module.exports = {
  printLog,
  errorHandler,
}