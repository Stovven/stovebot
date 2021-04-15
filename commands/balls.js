const Discord = module.require('discord.js');


module.exports.run = async (client, message, args) => {
    const attachment =  new Discord.MessageAttachment('./content/politics.gif', 'politics.gif')
    message.channel.send(attachment)
}
module.exports.help = {
  name: "balls"
}
