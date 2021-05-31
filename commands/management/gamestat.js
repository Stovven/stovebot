const Discord = require('discord.js')
const id = "218919888583000064"

module.exports = {
  commands: 'gamestat' ,
  description: 'changes the game status, completely unusable for everyone',
  callback: (message, arguments, text, client) => {
  if(message.author.id === id) {
    message.delete({reason: "dont worry this is normal"})
    if(arguments.length === 0) return message.channel.send('send a valid status and fuckin uhh playing status')
    let state = arguments[0]
    let status = text.split(' ')
    status.shift()
    let finalStatus = status.join(' ')
  //  console.log(`state: ${state} status: ${status} finalStatus: ${finalStatus}`)
    client.user.setActivity(`${finalStatus}`, { type: `${state}` })
    } else {
    let embed = new Discord.MessageEmbed()
    .setColor('#47FC74')
    .setAuthor("no!")
    .setDescription(`fuck off, like really`)
    message.channel.send(embed)
  }
  },
}
