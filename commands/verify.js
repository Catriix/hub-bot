module.exports = {
  name: 'verify',
  description: 'Verify if a user is a member.',
  usage: `<todo>`,
  cooldown: 5,
  run: async (message, args, Members, Reaction, client) => {
    const id = args[0];
    const member = await Members.findOne({ where: { uniqueID: id } });
    if (member) {
      return message.channel.send(`The member with the ID ${id} is named ${member.name}.`);
    }
    return message.channel.send(`Member with ID ${id} not found.`);
  },
}
