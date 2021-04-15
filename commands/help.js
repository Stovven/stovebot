const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
  message.channel.send(`this is temp, will change in the future
  **Prefix**: s!
  **balls**: politics.gif
  **edgeworth**: makes your "funny" string into an edgeworth quote
  **gman**: random gman quote
  **kiryu**: random image command #4572
  **ping**: pings the bot and also some cypto api, gotta know if it's up
  **say**: no fuck off
  **steam**: uses a steam64(dex) id and picks a random game from their library
  **welcome**: random image command #4573`)
}
module.exports.help = {
  name: "help",
  cooldown: 5,
}
