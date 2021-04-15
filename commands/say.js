const Discord = require('discord.js')
const id = "218919888583000064"

module.exports.run = async (client, message, args) => {
  function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}
if(message.author.id === id) {
  let funny = args.join(" ")
  message.delete({reason: "dont worry this is normal"})
  if(isEmptyObject(funny)) return message.channel.send('send a string!')
  message.channel.send(funny)
} else {
  let embed = new Discord.MessageEmbed()
  .setColor('#47FC74')
  .setAuthor("no!")
  .setDescription(`fuck off ~andy 2021`)
  message.channel.send(embed)
}
}
module.exports.help = {
  name: "say",
  cooldown: 1
}
