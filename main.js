const Discord = require('discord.js');
const Turntable = require('ttapi');
const Starboard = require('discord-starboards')
const Canvas = require('canvas');

const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });
const starmanager = new Starboard(client)
client.starboardManager = starmanager

const config = require('./config/config.json');
const loadTurntable = require('./utils/turntable.js')
const loadWelcome = require('./utils/welcome.js')
const loadCommands = require('./commands/core/load-commands.js')
const commandBase = require(`./commands/core/command-base.js`)

client.once('ready', () => {
	console.log('Ready! i think?');
  client.user.setPresence({
    status: 'idle',
	activities: [{
    name: 'you',
    type: "WATCHING"
}]})
	loadCommands(client)
	loadTurntable(client)
	commandBase.listen(client);
	if(client.starboardManager.starboards.length === 0) {
		console.log('creating starboards')
		client.starboardManager.create(client.channels.cache.get(`${config.starboardchannel}`), {
			threshold: 3,
			starBotMsg: false,
			selfStar: false,
			color: '47FC74'
		})
	} else {
		console.log('loading starboard')
	}
});

client.on('guildMemberAdd', async (member) => {
	loadWelcome(client, member)
})

client.on("error", console.error);

process.on('unhandledRejection', error => {
	if(error.code !== 50013) {
		console.error('hey idiot, something broke:', error);
		return
	}
	return
});



client.login(process.env.DISCORD_TOKEN);
