module.exports = {
  name: 'youdabest',
  cooldown: 5,
  description: 'You are the best!',
  run: async (message, args, Members, Reaction, client) => {
    message.channel.send('Nah, you da best <3');
  },
}
