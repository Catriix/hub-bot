const Sequelize = require('sequelize');

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
