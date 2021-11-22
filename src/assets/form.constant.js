module.exports = {
  gameStart: JSON.stringify({
    inline_keyboard: [
      [
        {text: '✅', callback_data: 'startGame'},
        {text: '➕', callback_data: 'addPlayer'},
        {text: '❌', callback_data: 'cancelGame'},
      ],
    ]
  }),
  gameChoice: JSON.stringify({
    inline_keyboard: [
      [
        {text: '👊', callback_data: 'gameChoice-stone'},
        {text: '✌️', callback_data: 'gameChoice-scissors'},
        {text: '🖐', callback_data: 'gameChoice-paper'},
      ],
    ]
  }),
}