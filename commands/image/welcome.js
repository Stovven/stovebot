const Discord = module.require('discord.js')
module.exports = {
  commands: 'welcome' ,
  description: 'another funny image',
  callback: (message, arguments, text) => {
    const attachment =  new Discord.MessageAttachment('./content/welcome.png', 'welcome.png')
    message.channel.send({files: [attachment]})
  },
}
