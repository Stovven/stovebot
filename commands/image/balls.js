const Discord = module.require('discord.js');

module.exports = {
  commands: 'balls' ,
  callback: (message, arguments, text) => {
    const attachment =  new Discord.MessageAttachment('./content/politics.gif', 'politics.gif')
    message.channel.send(attachment)
  },
}
