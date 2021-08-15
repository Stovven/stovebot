const api = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest'
const snekfetch = require("snekfetch");
const Discord = require('discord.js')

module.exports = {
  commands: 'ping' ,
  description: 'both tells you if the bot is infact alive and also give you some crypto price',
  callback: (message, arguments, text) => {
    snekfetch.get(api, {
      headers: {
        'X-CMC_PRO_API_KEY': `${process.env.CYPTO_TOKEN}`,
      }
    }).then(r => {
      let body = r.body;
      const random = body.data[Math.floor(Math.random() * body.data.length)];
      let embed = new Discord.MessageEmbed()
      .setColor('#47FC74')
      .setAuthor("yes i am alive")
      .setDescription(`oh and also the current price of this random ass cypto called "${random.name}" is $${random.quote.USD.price.toFixed(2)}`)
      .setFooter(`thanks andy, also be warned that this might not work sometimes. id ${random.id}`)

        message.channel.send({embeds: [embed]})
    }).catch(error => {
      let embed = new Discord.MessageEmbed()
      .setColor('#47FC74')
      .setAuthor("yes i am alive")
      .setDescription(`the api however is not, probably due to request limits. oh well`)
      .setFooter(`im using a shitty api, dont blame me`)
      message.channel.send({embeds: [embed]})
    })
  }
}
