const { prefix } = require('../config.json');

module.exports = {
  name: 'help',
  description: 'Lists the commands',
  execute(message, args) {
    const data = [];
    const { commands } = message.client;

    if(!args.length) {
      data.push('List of all the commands:');
      data.push(commands.map(command => command.name).join(', '));
      data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

      return message.author.send(data, { split:true })
        .then(() => {
          if (message.channel.type === 'dm') return;
          message.reply('I sent you a DM with all the commands.');
        })
        .catch(error => {
          console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
          message.reply('it does seem like I can\'t DM you! You must have disabled DMs for server members.')
        })
    }

    const name = args[0].toLowerCase();
    const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

    if(!command) {
      return message.reply('This command does not exist.');
    }

    data.push(`**Name:** ${command.name}`);

    if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
    if (command.description) data.push(`**Description:** ${command.description}`);
    if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

    data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

    message.channel.send(data, { split: true});
  },
};
