const Discord = require('discord.js')
const id = "218919888583000064"

module.exports = {
  commands: 'status' ,
  description: 'changes the status, completely unusable for everyone',
  callback: (message, arguments, text, client) => {
  if(message.author.id === id) {
    message.delete({reason: "dont worry this is normal"})
    if(arguments.length === 0) return message.channel.send('send a valid status idiot (online, idle, dnd, invisible)')
    let status = arguments[0]
    client.user.setStatus(status).catch(error => {
      message.channel.send(`we've done fucked up please send with a valid status`)
    })
  } else {
    let embed = new Discord.MessageEmbed()
    .setColor('#47FC74')
    .setAuthor("no!")
    .setDescription(`fuck off, like really`)
    message.channel.send(embed)
  }
  },
}
