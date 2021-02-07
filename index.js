const dotenv = require('dotenv');
dotenv.config();

const fs = require('fs');
const Discord = require('discord.js');
const { prefix } = require('./config.json');

const Sequelize = require('sequelize');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const cooldowns = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

// Connection information
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
host: 'localhost',
dialect: 'sqlite',
logging: false,
// Sqlite only
storage: 'database.sqlite',
});



/*
* equivalent to CREATE table
*/

const Members = sequelize.define('members', {
uniqueID: {
  type: Sequelize.INTEGER,
  unique: true,
},
name: {
  type: Sequelize.STRING,
},
surname: {
  type: Sequelize.STRING,
},
DiscordID: {
  type: Sequelize.INTEGER,
  unique: true,
},
usernameCTU: {
  type: Sequelize.STRING,
  unique: true,
},
accessLevel: {
  type: Sequelize.INTEGER,
},
xp: {
  type: Sequelize.INTEGER,
  defaultValue: 0,
},
email: {
  type: Sequelize.STRING,
  unique: true,
},
dob: {
  type: Sequelize.DATEONLY
},
phone: {
  type: Sequelize.INTEGER
},
birthPlace: {
  type: Sequelize.TEXT
},
residence: {
  type: Sequelize.TEXT
},
});


const Reaction = sequelize.define('reaction', {
  roleID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  emoteID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  messageID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

        // Client finished loading

client.once('ready', () => {
  console.log('The bot is online!');
  Members.sync();
  Reaction.sync();
});

client.login(process.env.TOKEN);

        // Waiting for messages

client.on('message', message => {

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if(!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);

  if (command.args && !args.length) {
    return message.channel.send(`You didn\'t provide any arguments, ${message.author}!`);
  }

  if (command.guildOnly && message.channel.type === 'dm') {
    return message.reply('I can\'t execute that command inside DMs!');
  }

  if (command.permissions) {
    const authorPerms = message.channel.permissionsFor(message.author);
    if (!authorPerms || !authorPerms.has(command.permissions)) {
      return message.reply('You can\'t do this!');
    }
  }

  if(command.args && !args.length) {
    let reply = `This command needs arguments to work.`;

    if(command.usage) {
      reply += `\n the correct use of this command is: \`${prefix}${commandName} ${command.usage}\``;
    }

    return message.channel.send(reply);
  }

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());

  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now ) / 1000;
      return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.run(message, args, Members, Reaction, client);
  } catch (error) {
    console.error(error);
    message.reply('an error occured while trying to execute this command.');
  }
});
