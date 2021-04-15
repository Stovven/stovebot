const snekfetch = require("snekfetch");
const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
  function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}
  let steamid = args.join(" ")
  let embed = new Discord.MessageEmbed()
  .setColor('#47FC74')
  .setAuthor("You're missing your Steamid!")
  .setDescription(`Find your Steamid on this website (https://steamidfinder.com/), Use Steamid64 (Dec)! `)
  .setImage(`https://i.imgur.com/4FUmkmo.png`)
  .setFooter(`steam api moment`)
  if(isEmptyObject(steamid)) return message.channel.send(embed)
  let api = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${process.env.STEAM_TOKEN}&steamid=${steamid}&format=json`
//  console.log(api)
// osha code
 // if(steamid === "76561199036115722")  {
 //   snekfetch.get(api).then(r => {
 //     let body = r.body;
 //    // const random = body.find(post => post.response.games.appid === 7670);
 //     let entry = body.response.find(post => post.id === id);
 //     console.log(entry)
 //     let member = message.author
 //     let avatar = member.displayAvatarURL()
 //     let embed1 = new Discord.MessageEmbed()
 //     .setColor('#47FC74')
 //     .setAuthor(`${member.username}, Here's your random steam game!`, avatar)
 //     .setTitle(`You have ${Math.floor(random.playtime_forever / 60)} Hour(s) in this game.`)
 //     .addFields(
 //    { name: 'Steam Link', value: `https://store.steampowered.com/app/${random.appid}`}, )
 //   .setImage(`https://cdn.cloudflare.steamstatic.com/steam/apps/${random.appid}/header.jpg`)
 //   .setFooter(`Steam App id: ${random.appid}`)
 //   message.channel.send(embed1).catch(error => {
 //     let embed = new Discord.MessageEmbed()
 //     .setColor('#47FC74')
 //     .setAuthor("yes i am alive")
 //     .setDescription(`the api however is not, probably due to request limits. oh well`)
 //     .setFooter(`steam api moment`)
 //     message.channel.send(embed)
 //   })
 // });
 //   return;
 // }
// this is the main code
  snekfetch.get(api).then(r => {
    let body = r.body;
  //  console.log(body.response.games)
   const random = body.response.games[Math.floor(Math.random() * body.response.games.length)];
    // let id = Number(args[0]);
    // if(!id) return message.channel.send("Supply an id");
    // if(isNaN(id)) return message.channel.send("Supply a number.");

    // let entry = body.data.find(post => post.id === id);
    // if(!entry) return message.channel.send("This entry doesnt exist");
    let member = message.author
    let avatar = member.displayAvatarURL()
//    console.log(avatar)
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
module.exports.help = {
  name: "steam",
  cooldown: 5,
}
