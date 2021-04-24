const Discord = require('discord.js')
const id = "218919888583000064"

module.exports = {
  commands: 'say' ,
  callback: (message, arguments, text) => {
    function isEmptyObject(obj) {
    return !Object.keys(obj).length;
  }
  if(message.author.id === id) {
    message.delete({reason: "dont worry this is normal"})
    if(isEmptyObject(text)) return message.channel.send('fuck!')
    message.channel.send(text)
  } else {
    let embed = new Discord.MessageEmbed()
    .setColor('#47FC74')
    .setAuthor("no!")
    .setDescription(`fuck off ~andy 2021`)
    message.channel.send(embed)
  }
  },
}
