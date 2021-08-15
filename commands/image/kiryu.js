const Discord = module.require('discord.js')
module.exports = {
  commands: 'kiryu' ,
  description: 'comedy image',
  callback: (message, arguments, text) => {
    const attachment =  new Discord.MessageAttachment('./content/kiryu.png', 'kiryu.png')
    message.channel.send({files: [attachment]})
  },
}
