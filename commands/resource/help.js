const Discord = require('discord.js')
const loadCommands = require('../core/load-commands')
const { prefix } = require('../../config/config.json')

module.exports = {
  commands: 'help' ,
  description: 'this helps you, i guess',
  callback: (message, arguments, text) => {
    let reply = 'this bot does have commands! not embeded though :(\n\n'
    const commands = loadCommands()

    for (const command of commands) {
      // Check for permissions
      let permissions = command.permission

      if (permissions) {
        let hasPermission = true
        if (typeof permissions === 'string') {
          permissions = [permissions]
        }

        for (const permission of permissions) {
          if (!message.member.hasPermission(permission)) {
            hasPermission = false
            break
          }
        }

        if (!hasPermission) {
          continue
        }
      }

      // Format the text
      const mainCommand =
        typeof command.commands === 'string' ? command.commands : command.commands
      const args = command.expectedArgs ? ` ${command.expectedArgs}` : ''
      const { description } = command

      reply += `**${prefix}${mainCommand}${args}** = ${description}\n`
    }
    let embed = new Discord.MessageEmbed()
    .setTitle(`hello i have commands`)
    .setDescription(`${reply}`)
    .setColor('#47FC74')

    message.channel.send({embeds: [embed]})
  }
}
