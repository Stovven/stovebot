const Discord = module.require('discord.js')
module.exports = {
  commands: 'welcome' ,
  callback: (message, arguments, text) => {
    const attachment =  new Discord.MessageAttachment('./content/welcome.png', 'welcome.png')
    message.channel.send(attachment)
  },
}
