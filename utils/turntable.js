const Turntable = module.require('ttapi')
const Discord = module.require('discord.js')
const turntableJSON = module.require('../config/turntable.json')

module.exports = (client) => {


  //login into turntable
  const AUTH = `${process.env.TT_AUTH}`
  const USERID = `${process.env.TT_USERID}`
  // room to log
  const ROOMID = `${process.env.TT_ROOMID}`
  const data = ""

  //actually login into turnable and goes into room to log
  const ttClient = new Turntable(AUTH, USERID)
  ttClient.on('ready', async data => {
  	await ttClient.roomRegister(ROOMID, function() {
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
  	// if(ttUsername.name == "stovven") {
  	// 	let embed = new Discord.MessageEmbed()
  	// 	.setColor('#47FC74')
  	// 	.setAuthor(`${ttUsername.name} has joined the turntable!`)
  	// 	.setDescription(`hey look, thats me!`)
  	// 	.setFooter(`god i hate this api`)
  	// client.channels.cache.get('834077440502399026').send(embed)
  	// 	return;
  	//}
  		let turntableQuote = turntableJSON.joining[Math.floor(Math.random()*turntableJSON.joining.length)]
  		let embed = new Discord.MessageEmbed()
  		.setColor('#47FC74')
  		.setAuthor(`${ttUsername.name} has joined the turntable!`)
  		.setDescription(turntableQuote)
  		.setFooter(`god i hate this api`)
  	client.channels.cache.get('834077440502399026').send(embed)
    ttClient.roomInfo(false, r => {
      if(r.success) {
      console.log(r.room.metadata.listeners)
      let embed = new Discord.MessageEmbed()
      .setColor('#47FC74')
      .setAuthor(`Current Users: ${r.room.metadata.listeners}`)
      .setFooter(`god i hate discord's api`)
      client.channels.cache.get('834077440502399026').send(embed)
    }
    })

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
    ttClient.roomInfo(false, r => {
      if(r.success) {
      console.log(r.room.metadata.listeners)
      let embed = new Discord.MessageEmbed()
      .setColor('#47FC74')
      .setAuthor(`Current Users: ${r.room.metadata.listeners}`)
      .setFooter(`god i hate discord's api`)
      client.channels.cache.get('834077440502399026').send(embed)
    }
  })

  //wish i didnt have to do this perhaps
  ttClient.on('newsong', async data => {
  	ttClient.bop()
  })
}
