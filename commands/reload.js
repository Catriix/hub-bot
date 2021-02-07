module.exports = {
  name: 'reload',
  description: 'Reloads a command',
  run: async (message, args, Members, Reaction, client) => {
    const commandName = args[0].toLowerCase();
    const command = message.client.commands.get(commandName)
      || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return message.channel.send(`There is no command with the name or alias \`${commandName}\`, ${message.author}!`);

    delete require.cache[require.resolve(`./${commandName}.js`)];

    try {
      const newCommand = require(`./${commandName}.js`);
      message.client.commands.set(newCommand.config.name, newCommand);
      message.channel.send(`The command \`${command.name}\` was successfully reloaded!`);
    } catch (error) {
      console.error(error);
      message.channel.send(`There was an error while reloading the command \`${commandName}\`:\n\`${error.message}\``);
    }
  },
}
