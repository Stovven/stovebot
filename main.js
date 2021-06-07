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
const commandBase = require(`./commands/core/command-base.js`)
const turntableJSON = require(`./config/turntable.json`)


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
		color: '47FC74'
	})
}
	loadCommands(client)
	commandBase.listen(client);

		// turntable features

		//login into turntable
		const AUTH = `${process.env.TT_AUTH}`
		const USERID = `${process.env.TT_USERID}`
		// room to log
		const ROOMID = `${process.env.TT_ROOMID}`
		const data = ""

		//actually login into turnable and goes into room to log
		const ttClient = new Turntable(AUTH, USERID)
		ttClient.on('ready', async data => {
			ttClient.roomRegister(ROOMID, function() {
				ttClient.setAsBot();
			});
			console.log('Turntable ready!')
		})
		//logs if leaves or joins
		ttClient.on('registered', async data => {
		const ttUsername = data.user[Math.floor(Math.random() * data.user.length)];
		const filter = "ttstats"
		if(ttUsername.name.includes(filter)) {
					return;
				}
			if(ttUsername.name == "stovven") {
				let embed = new Discord.MessageEmbed()
				.setColor('#47FC74')
				.setAuthor(`${ttUsername.name} has joined the turntable!`)
				.setDescription(`hey look, thats me!`)
				.setFooter(`god i hate this api`)
			client.channels.cache.get('834077440502399026').send(embed)
				return;
			}
				let turntableQuote = turntableJSON.joining[Math.floor(Math.random()*turntableJSON.joining.length)]
				let embed = new Discord.MessageEmbed()
				.setColor('#47FC74')
				.setAuthor(`${ttUsername.name} has joined the turntable!`)
				.setDescription(turntableQuote)
				.setFooter(`god i hate this api`)
			client.channels.cache.get('834077440502399026').send(embed)
		})

		ttClient.on('deregistered', async data => {
			const ttUsername = data.user[Math.floor(Math.random() * data.user.length)];
			const filter = "ttstats"
			if(ttUsername.name.includes(filter)) {
						return;
					}
			let turntableQuote = turntableJSON.leaving[Math.floor(Math.random()*turntableJSON.leaving.length)]
			let embed = new Discord.MessageEmbed()
			    .setColor('#47FC74')
			    .setAuthor(`${ttUsername.name} has left the turntable!`)
			    .setDescription(turntableQuote)
			    .setFooter(`god i still hate this api`)
			client.channels.cache.get('834077440502399026').send(embed)
		})

		//wish i didnt have to do this perhaps
		ttClient.on('newsong', async data => {
			ttClient.bop()
		})
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
