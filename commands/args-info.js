module.exports = {
  name: 'args-info',
  description: 'Information about the provided arguments.',
  args: true,
  run: async (message, args, Members, Reaction, client) => {
    if (args[0] === 'foo') {
      return message.channel.send('bar');
    }

    message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
  },
}
