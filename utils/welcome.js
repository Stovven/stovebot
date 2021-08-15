const Canvas = module.require('canvas')
const Discord = module.require('discord.js')
const { welcomeChannel } = require('../config/config.json')

module.exports = async (client, member) => {

    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	let text = member.user.username
	const applyText = (canvas, text) => {
		const ctx = canvas.getContext('2d');
		let fontSize = 70;

		do {
			ctx.font = `${fontSize -= 10}px sans-serif`;
		} while (ctx.measureText(text).width > canvas.width - 100)
		return ctx.font
	};


	const canvas = Canvas.createCanvas(500, 281);
	const ctx = canvas.getContext('2d');
	const image = await Canvas.loadImage('./content/welcome.png');
	ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
	ctx.drawImage(avatar, 10, 70, 150, 150);
	ctx.font = applyText(canvas, `${member.displayName}`);
	ctx.fillStyle = '#000000'
	ctx.fillText(text, canvas.width / 3, canvas.height / 2.3);



	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welecome.png')

    client.channels.cache.get(`${welcomeChannel}`).send({content: 'fuck you', files: [attachment]});
    //member.roles.add(member.guild.roles.cache.find(role => role.name === "friend"))



}