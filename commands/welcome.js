const Discord = module.require('discord.js');


module.exports.run = async (client, message, args) => {
    const attachment =  new Discord.MessageAttachment('./content/welcome.png', 'welcome.png')
    message.channel.send(attachment)
}
module.exports.help = {
  name: "welcome"
}
