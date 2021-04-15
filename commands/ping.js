const api = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest'
const snekfetch = require("snekfetch");
const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
  snekfetch.get(api, {
    headers: {
      'X-CMC_PRO_API_KEY': `${process.env.CYPTO_TOKEN}`,
    }
  }).then(r => {
    let body = r.body;
    const random = body.data[Math.floor(Math.random() * body.data.length)];
    // let id = Number(args[0]);
    // if(!id) return message.channel.send("Supply an id");
    // if(isNaN(id)) return message.channel.send("Supply a number.");

    // let entry = body.data.find(post => post.id === id);
    // if(!entry) return message.channel.send("This entry doesnt exist");
    // console.log(entry)

    let embed = new Discord.MessageEmbed()
    .setColor('#47FC74')
    .setAuthor("yes i am alive")
    .setDescription(`oh and also the current price of this random ass cypto called "${random.name}" is $${random.quote.USD.price.toFixed(2)}`)
    .setFooter(`thanks andy, also be warned that this might not work sometimes. id ${random.id}`)

      message.channel.send(embed)
  }).catch(error => {
    let embed = new Discord.MessageEmbed()
    .setColor('#47FC74')
    .setAuthor("yes i am alive")
    .setDescription(`the api however is not, probably due to request limits. oh well`)
    .setFooter(`im using a shitty api, dont blame me`)
    message.channel.send(embed)
  })
}
module.exports.help = {
  name: "ping",
  cooldown: 5,
}
