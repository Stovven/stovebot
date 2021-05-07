// ==================================================
// for the love of god never make me deal with steam ever again
// or javascript, like actually. im dumb and i dont really know how i'd push a object out of a if statement
// ==================================================

const snekfetch = require("snekfetch");
const Discord = require('discord.js')
// const SteamID = require('steamid')
// const config = require('../../config/config_keys.json')



module.exports = {
  commands: 'steam' ,
  description: 'picks a random game out of your steam library',
  expectedArgs: '<steamid64 (dec) or custom steam url>',
  callback: (message, arguments, text) => {

  //embed and check for empty array
  if(arguments.length === 0) {
    let embed = new Discord.MessageEmbed()
    .setColor('#47FC74')
    .setAuthor("You're missing your Steamid or your custom Steam URL!")
    .setDescription(`Find your Steamid on this website (https://steamidfinder.com/), Use Steamid64 (Dec)! You can also use your custom Steam URL! `)
    .setImage(`https://i.imgur.com/16meXnO.png`)
    .setFooter(`steam api moment`)
    message.channel.send(embed)
    return
  }

// this just checks we're not dealing with a steam64 key, and if we arent then lets just fuckin uh change it real quick
// oh my fucking god i hate this, just re-do the whole thing then break, it'll cause less pain then trying to figure out how to just throw out the variable
let steamID = arguments[0]
if(isNaN(steamID)) {
    let vanityURL = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${process.env.STEAM_TOKEN}&vanityurl=${steamID}`
    snekfetch.get(vanityURL).then(r => {
      let body = r.body
      let steamIDformated = body.response.steamid
        let api = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${process.env.STEAM_TOKEN}&steamid=${steamIDformated}&format=json`
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
    }).catch(error => {
      let embed = new Discord.MessageEmbed()
      .setColor('#47FC74')
      .setAuthor("idfk something broke")
      .setDescription(`profiles probably private or just doesnt exist, recheck it`)
      .setFooter(`steam api moment`)
      message.channel.send(embed)
    })

})
return
}
  // ===============================================================================================================================================
  // okay so basically if it a number we could technically check if its valid but like whats the point when the api just returns as an error
  // basically just catch an error and just say something went wrong, no clue why i have the steamid node library anymore lol
  // ===============================================================================================================================================

    let api = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${process.env.STEAM_TOKEN}&steamid=${steamID}&format=json`
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
 }).catch(error => {
   let embed = new Discord.MessageEmbed()
   .setColor('#47FC74')
   .setAuthor("idfk something broke")
   .setDescription(`profiles probably private or just doesnt exist, recheck it`)
   .setFooter(`steam api moment`)
   message.channel.send(embed)
 })

}
}
