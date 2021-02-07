module.exports = {
  name: 'prune',
  description: 'Prune up to 99 messages',
  usage: `<amount of mesages to delete>`,
  cooldown: 5,
  guildOnly: true,
  permissions: 'MANAGE_MESSAGES',
  run: async (message, args, Members, Reaction, client) => {
    const amount = parseInt(args[0]) + 1;

    if(isNaN(amount)) {
      return message.reply('that doesn\'t seem to be a valid number.');
    } else if (amount <= 1 || amount > 99) {
      return message.reply('enter a number between 1 and 99.');
    }

    message.channel.bulkDelete(amount, true).catch(err => {
      console.error(err);
      message.channel.send('an error occured while trying to prune messages in this channel.');
    });
  },
}
