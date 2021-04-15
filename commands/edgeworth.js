const Discord = require('discord.js');
const Canvas = require('canvas');

module.exports.run = async (client, message, args) => {
  function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}
  let text = args.join(" ")

  if(isEmptyObject(text)) return message.channel.send('send a message with this command!')

  const applyText = (canvas, text) => {
    const ctx = canvas.getContext('2d');
    let fontSize = 70;

    do {
      ctx.font = `${fontSize -= 10}px Igiari`;
    } while (ctx.measureText(text).width > canvas.width - 100)
    return ctx.font
  };


  const canvas = Canvas.createCanvas(1280, 854);
  const ctx = canvas.getContext('2d');
  const image = await Canvas.loadImage('./content/notandy.png');
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  ctx.font = applyText(canvas, `${text}`);
  ctx.fillStyle = '#ffffff'
  ctx.fillText(text, canvas.width / 60, canvas.height / 1.2);



  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'edgeworth.png')

  message.channel.send('edgeworth moment', attachment);
//  message.channel.send('you need to enter a string with the command')
}
module.exports.help = {
  name: "edgeworth",
  cooldown: 5
}
