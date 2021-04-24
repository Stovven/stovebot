const Discord = module.require('discord.js');
const gman = module.require("../../config/gman.json");
const quotes = gman.quotes

module.exports = {
  commands: 'gman' ,
  callback: (message, arguments, text) => {
    var q = gman.quotes[Math.floor(Math.random()*quotes.length)];
    message.channel.send(q)
  },
}
