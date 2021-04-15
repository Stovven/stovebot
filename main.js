const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const config = require('./config/config.json');
const gman = require("./config/gman.json");
const prefix = config.prefix
const quotes = gman.quotes
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

fs.readdir('./commands/', (err, files) => {
	if(err) console.error(err);

	let jsfiles = files.filter(f => f.split(".").pop() === "js");
	if(jsfiles.length <= 0 ) {
		console.log("Missing commands!");
		return;
	}

	console.log(`Loading ${jsfiles.length} commands.`);

	jsfiles.forEach((f, i) => {
		let props = require(`./commands/${f}`);
		console.log(`${i + 1}: ${f} loaded`)
		client.commands.set(props.help.name, props);
	});
});

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
});


client.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let messageArray = message.content.split(/\s+/g);
    let command = messageArray[0];
    let args = messageArray.slice(1);

		if(!command.startsWith(prefix)) return;
		let cmd = client.commands.get(command.slice(prefix.length));
		if(cmd == undefined) return;


	 	const { cooldowns } = client;
	 if (!cooldowns.has(cmd.help.name)) {
		cooldowns.set(cmd.help.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(cmd.help.name);
	const cooldownAmount = (cmd.help.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${cmd.help.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

		if(cmd) cmd.run(client, message, args);
});
client.on("error", console.error);


client.login(process.env.DISCORD_TOKEN);
