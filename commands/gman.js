const Discord = module.require('discord.js');
const gman = module.require("../config/gman.json");
const quotes = gman.quotes

module.exports.run = async (client, message, args) => {
    var q = gman.quotes[Math.floor(Math.random()*quotes.length)];
    message.channel.send(q)
}
module.exports.help = {
  name: "gman"
}
