const Discord = module.require('discord.js');


module.exports.run = async (client, message, args) => {
    const attachment =  new Discord.MessageAttachment('./content/kiryu.png', 'kiryu.png')
    message.channel.send(attachment)
}
module.exports.help = {
  name: "kiryu"
}
