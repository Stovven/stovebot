// =======================================================================================================
// im dumb for using var, i could just delcare something and then just like put something in it instead
// of being dumb and redeclaring it, fucking hell i am stupid, fixed the weird undefined games list not by
// actually fixing it. instead i just said "something happened" and fuck i dont know why
// probably on steams end. cant do much about it
// =======================================================================================================

const Discord = module.require('discord.js');
const Snekfetch = module.require("snekfetch");
const SteamID = module.require('steamid')


module.exports = {
  commands: 'steam' ,
  description: 'picks a random game that you own!',
  expectedArgs: '<steamid64 (dec) or custom steam url>',
  callback: async (message, arguments, text, client) => {
    let messageID = arguments[0]
    let steamID = ''

    // check if message is empty
    if(!messageID) {
      let embed = new Discord.MessageEmbed()
      .setColor('#47FC74')
      .setAuthor("You're missing your Steamid or your custom Steam URL!")
      .setDescription(`Find your Steamid on this website (https://steamidfinder.com/), Use Steamid64 (Dec)! You can also use your custom Steam URL! `)
      .setImage(`https://i.imgur.com/16meXnO.png`)
      .setFooter(`steam api moment`)
      message.channel.send({embeds: [embed]})
      return 
    }

    // check if its a number, if it isn't then we have a vanity URL.
    if(isNaN(messageID)) {
    let vanityURL = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${process.env.STEAM_TOKEN}&vanityurl=${messageID}`
    let steamIDresponse = await Snekfetch.get(vanityURL)
    if(!steamIDresponse.body.response.steamid) {
      let embed = new Discord.MessageEmbed()
      .setColor('#47FC74')
      .setAuthor("The vanity URL leads to no steam account!")
      .setDescription(`check it, probably misspelled it or something`)
      .setFooter(`oh well`)
      message.channel.send({embeds: [embed]})
      return
    }
     steamID = steamIDresponse.body.response.steamid
  } else {

    // straight up just put it into the variable if you roll with steamIDs
     steamID = await messageID
  }
  
  // we're checking if the steamID is valid, if not return.
  let sid = await new SteamID(`${steamID}`)
  if(!sid.isValid()) {
    let embed = new Discord.MessageEmbed()
    .setColor('#47FC74')
    .setAuthor("The SteamID leads to no steam account!")
    .setDescription(`check it, i dunno how its wrong but it is`)
    .setFooter(`oh well`)
    message.channel.send({embeds: [embed]})
    return
  }

  // we check the profiles privacy settings
  let steamAccountAPI = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_TOKEN}&steamids=${steamID}`
  let steamAccountResponse = await Snekfetch.get(steamAccountAPI)
  let communityState = await steamAccountResponse.body.response.players
  let [ communityStateObject ] = communityState
  if(communityStateObject.communityvisibilitystate == 2 || communityStateObject.communityvisibilitystate == 1 ) {
    let embed = new Discord.MessageEmbed()
    .setColor('#47FC74')
    .setAuthor("The Steam account isnt public!")
    .setDescription(`change it in your privacy settings, we cant choose a game from it if we cant see it`)
    .setFooter(`oh well`)
    message.channel.send({embeds: [embed]})
    return
  }


  // we now need to use the steam api to find a random game
  let steamAPI = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${process.env.STEAM_TOKEN}&steamid=${steamID}&format=json`
  let steamAPIResponse = await Snekfetch.get(steamAPI)
  // fuck i dont know why we sometimes get an undefined response, error out just for feedback that SOMETHINGS gone wrong
  if(Object.keys(steamAPIResponse.body.response).length === 0 && steamAPIResponse.body.response.constructor === Object) {
    let embed = new Discord.MessageEmbed()
    .setColor('#47FC74')
    .setAuthor("fuck i dont know")
    .setDescription(`no really i have no clue, bug the one developer if you want`)
    .setFooter(`fuck`)
    message.channel.send({embeds: [embed]})
    return
  }
  let randomGame = steamAPIResponse.body.response.games[Math.floor(Math.random() * steamAPIResponse.body.response.games.length)] 
  //send them an embed, catch if any errors happen
  let member = message.author
  let avatar = member.displayAvatarURL()
  let embed = new Discord.MessageEmbed()
          .setColor('#47FC74')
          .setAuthor(`${member.username}, Here's your random steam game!`, avatar)
          .setTitle(`You have ${Math.floor(randomGame.playtime_forever / 60)} Hour(s) in this game.`)
          .addFields(
      		{ name: 'Steam Link:', value: `https://store.steampowered.com/app/${randomGame.appid}`},
          { name: 'Steam Profile:', value: `http://steamcommunity.com/profiles/${steamID}`},
          )
        .setImage(`https://cdn.cloudflare.steamstatic.com/steam/apps/${randomGame.appid}/header.jpg`)
        .setFooter(`Steam App id: ${randomGame.appid}`)
      message.channel.send({embeds: [embed]})
  .catch(error => {
    let embed = new Discord.MessageEmbed()
    .setColor('#47FC74')
    .setAuthor("somethings actually gone wrong")
    .setDescription(`call a programer! im sure he'll enjoy trying to fix it`)
    .setFooter(`fuck`)
    message.channel.send({embeds: [embed]})
  })
  },
}
