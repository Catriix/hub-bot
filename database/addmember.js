module.exports = {
  name: 'addmember',
  description: 'Add a member to the DB.',
  usage: `<todo>`,
  cooldown: 5,
  async execute(message, args) {
    try {
      const member = await Members.create({
        uniqueID: args[0],
        name: args[1],
        surname: args[2],
      });
      return message.reply('Member added!');
    } catch (e) {
      if(e.uniqueID === 'SequelizeUniqueConstraintError') {
        return message.reply('That user already exists.');
      }
      return message.reply('An error occured while adding the member.');
    }
  },
};
