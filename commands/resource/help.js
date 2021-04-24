const Discord = require('discord.js')

module.exports = {
  commands: 'help' ,
  callback: (message, arguments, text) => {
    message.channel.send('this does nothing for now')
  },
}
