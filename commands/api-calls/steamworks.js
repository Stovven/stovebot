const snekfetch = require("snekfetch");
const Discord = require('discord.js')

module.exports = {
  commands: 'steam' ,
  description: 'picks a random game out of your steam library',
  expectedArgs: '<steamid64 (dec)>',
  callback: (message, arguments, text) => {
    function isEmptyObject(obj) {
    return !Object.keys(obj).length;
  }
    let embed = new Discord.MessageEmbed()
    .setColor('#47FC74')
    .setAuthor("You're missing your Steamid!")
    .setDescription(`Find your Steamid on this website (https://steamidfinder.com/), Use Steamid64 (Dec)! `)
    .setImage(`https://i.imgur.com/4FUmkmo.png`)
    .setFooter(`steam api moment`)
    if(isEmptyObject(text)) return message.channel.send(embed)
    let api = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${process.env.STEAM_TOKEN}&steamid=${text}&format=json`
    snekfetch.get(api).then(r => {
      let body = r.body;
     const random = body.response.games[Math.floor(Math.random() * body.response.games.length)];
      let member = message.author
      let avatar = member.displayAvatarURL()
      let embed1 = new Discord.MessageEmbed()
      .setColor('#47FC74')
      .setAuthor(`${member.username}, Here's your random steam game!`, avatar)
      .setTitle(`You have ${Math.floor(random.playtime_forever / 60)} Hour(s) in this game.`)
      .addFields(
  		{ name: 'Steam Link', value: `https://store.steampowered.com/app/${random.appid}`}, )
    .setImage(`https://cdn.cloudflare.steamstatic.com/steam/apps/${random.appid}/header.jpg`)
    .setFooter(`Steam App id: ${random.appid}`)
    message.channel.send(embed1).catch(error => {
      let embed = new Discord.MessageEmbed()
      .setColor('#47FC74')
      .setAuthor("yes i am alive")
      .setDescription(`the api however is not, probably due to request limits. oh well`)
      .setFooter(`steam api moment`)
      message.channel.send(embed)
    })
  });
  }
}
