module.exports = {
  name: 'ping',
  cooldown: 5,
  description: 'Ping!',
  run: async (message, args, Members, Reaction, client) => {
    message.channel.send('Pong.');
  },
}
