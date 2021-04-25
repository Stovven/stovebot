// rewrite
//requirements
const Discord = require('discord.js');
const Turntable = require('ttapi');
const client = new Discord.Client();

const config = require('./config/config.json');
const loadCommands = require('./commands/core/load-commands.js')
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
				let embed = new Discord.MessageEmbed()
				.setColor('#47FC74')
				.setAuthor(`${ttUsername.name} has joined the turntable!`)
				.setDescription(`hey look, new people!`)
				.setFooter(`god i hate this api`)
			client.channels.cache.get('834077440502399026').send(embed)
		})

		ttClient.on('deregistered', async data => {
			const ttUsername = data.user[Math.floor(Math.random() * data.user.length)];
			const filter = "ttstats"
			if(ttUsername.name.includes(filter)) {
						return;
					}
			let embed = new Discord.MessageEmbed()
			    .setColor('#47FC74')
			    .setAuthor(`${ttUsername.name} has left the turntable!`)
			    .setDescription(`thats a shame innit.`)
			    .setFooter(`god i still hate this api`)
			client.channels.cache.get('834077440502399026').send(embed)
		})

		//wish i didnt have to do this perhaps
		ttClient.on('newsong', async data => {
			ttClient.bop()
		})
});

client.on("error", console.error);


client.login(process.env.DISCORD_TOKEN);
