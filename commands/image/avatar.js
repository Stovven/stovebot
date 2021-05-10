const Discord = require('discord.js')
const id = "218919888583000064"

module.exports = {
  commands: 'avatar' ,
  description: 'changes the avatar, completely unusable for everyone',
  callback: (message, arguments, text, client) => {
  if(message.author.id === id) {
    message.delete({reason: "dont worry this is normal"})
    if(arguments.length === 0) return message.channel.send('dumbass send some image link')
    let avatar = arguments[0]
    client.user.setAvatar(avatar).catch(error => {
      message.channel.send(`we've done fucked up please use a vaild link`)
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
