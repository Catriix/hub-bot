module.exports = {
  name: 'rolemsg',
  description: 'Add a reaction menu to a message.',
  usage: `<todo>`,
  cooldown: 5,
  run: async (message, args, Members, Reaction, client) => {
    await message.channel.send("Enter the message ID.");
    let answer = await message.channel.awaitMessages(answer => answer.author.id === message.author.id,{max:1});
    const msgID = (answer.map(answers => answers.content).join());

    await message.channel.send("Mention the role.");
    answer = await message.channel.awaitMessages(answer => answer.content,{max:1}).then((collected) => {
      roleID = collected.first().content.slice(3,-1);
    })

    await message.channel.send("Enter the emoji to be used.");
    answer = await message.channel.awaitMessages(answer => answer.author.id === message.author.id,{max:1});
    const emoji = (answer.map(answers => answers.content).join());
    var emojID = emoji.slice(1,-1);
    emojID = emojID.split(':');
    emojID = emojID[2];

    message.channel.messages.fetch({around: msgID, limit: 1}).then(messages => {
      messages.first().react(emojID);
    });

    try {
      const member = await Reaction.create({
        roleID: roleID,
        emoteID: emojID,
        messageID: msgID,
      });
      return message.reply('Reaction added!');
    } catch (e) {
      return message.reply('An error occured while adding the reaction to the DB.');
    }
  },
}
