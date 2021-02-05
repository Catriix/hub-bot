module.exports = {
  name: 'youdabest',
  cooldown: 5,
  description: 'You are the best!',
  execute(message, args) {
    message.channel.send('Nah, you da best <3');
  },
};
