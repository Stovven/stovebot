//requirements
const Discord = require('discord.js');
const Turntable = require('ttapi');
const Starboard = require('discord-starboards')
const Canvas = require('canvas');
const client = new Discord.Client();
const starmanager = new Starboard(client)
client.starboardManager = starmanager

const config = require('./config/config.json');
const loadCommands = require('./commands/core/load-commands.js')
const loadTurntable = require('./utils/turntable.js')
const commandBase = require(`./commands/core/command-base.js`)


process.on('unhandledRejection', error => {
	if(error.code !== 50013) {
		console.error('hey idiot, something broke:', error);
		return
	}
	return
});

client.once('ready', () => {
	console.log('Ready! i think?');
  client.user.setPresence({
      status: 'idle',
			activity: {
    name: 'you',
    type: "WATCHING"
}})
if(client.starboardManager.starboards.length === 0) {
	console.log('creating starboards')
	client.starboardManager.create(client.channels.cache.get('822039515236401172'), {
		threshold: 3,
    starBotMsg: false,
    selfStar: false,
		color: '47FC74'
	})
}
	loadCommands(client)
	loadTurntable(client)
	commandBase.listen(client);
});

client.on('guildMemberAdd', async member => {
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

client.channels.cache.get('822034078643519492').send('fuck you', attachment);
})

client.on("error", console.error);


client.login(process.env.DISCORD_TOKEN);
