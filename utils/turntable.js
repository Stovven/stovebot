const Turntable = module.require('ttapi')
const Discord = module.require('discord.js')
const turntableJSON = module.require('../config/turntable.json')
const config = module.require('../config/config.json')

module.exports = (client) => {

  // toggle
  if(!config.ttEnabled) return
  console.log(`turntable notifications enabled`)


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
  		let turntableQuote = turntableJSON.joining[Math.floor(Math.random()*turntableJSON.joining.length)]
  		let embed = new Discord.MessageEmbed()
  		.setColor('#47FC74')
  		.setAuthor(`${ttUsername.name} has joined the turntable!`)
  		.setDescription(turntableQuote)
  		.setFooter(`god i hate this api`)
  	let embedMessage = await client.channels.cache.get(`${config.ttChannel}`).send({embeds: [embed]})
    ttClient.roomInfo(false, r => {
      if(r.success) {
       let roomCount = r.room.metadata.listeners - 1
        if (roomCount < 0) {
          roomCount = 0
        }
      let newEmbed = new Discord.MessageEmbed()
      .setColor('#47FC74')
      .setAuthor(`${ttUsername.name} has joined the turntable!`)
  		.setDescription(turntableQuote)
  		.setFooter(`god i hate this api, Current users: ${roomCount}`)
      embedMessage.edit({embed: [newEmbed]})
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
  	let embedMessage = await client.channels.cache.get(`${config.ttChannel}`).send({embeds: [embed]})
    ttClient.roomInfo(false, r => {
      if(r.success) {
        let roomCount = r.room.metadata.listeners - 1
        if (roomCount < 0) {
          roomCount = 0
        }
      let newEmbed = new Discord.MessageEmbed()
      .setColor('#47FC74')
      .setAuthor(`${ttUsername.name} has left the turntable!`)
  		.setDescription(turntableQuote)
  		.setFooter(`god i hate this api, Current users: ${roomCount}`)
      embedMessage.edit({embed: [newEmbed]})
    }
  })
})

  //wish i didnt have to do this perhaps
  ttClient.on('newsong', async data => {
  	ttClient.bop()
  })
}
