const Discord = module.require('discord.js');
const { itsOkayChannel, itsNotOkayUserID } = require('../../config/config.json')

module.exports = {
  commands: 'okay' ,
  description: 'its okay i guess',
  callback: async (message, arguments, text, client) => {
    // ----------------------------------------------
    // we get the time and set it back a day, then generate
    // a snowflake out of it to get messages from the day before 
    // we then pick out three messages, one of them has the message content
    // the other two we use for names, then we use the same system to pick
    // out messages from one person and compare it to our correct message
    // --------------------------------------------
    
    // snowflake time convert
    function randomDate(start, end) {
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }
    const time = randomDate(new Date(2020, 18, 3), new Date());
    const timeSecondMesssage = randomDate(new Date(2020, 18, 3), new Date());
    const timeThirdMessage = randomDate(new Date(2020, 18, 3), new Date());
    timeSecondMesssage.setDate(timeSecondMesssage.getDate() - Math.floor(Math.random() * 11))
    timeThirdMessage.setDate(timeThirdMessage.getDate() - Math.floor(Math.random() * 11 + 5))

  let snowflakeGen1 = Discord.SnowflakeUtil.generate(time)
  let snowflakeGen2 = Discord.SnowflakeUtil.generate(timeSecondMesssage)
  let snowflakeGen3 = Discord.SnowflakeUtil.generate(timeThirdMessage)

  //pick our channel
  let randomChannel = itsOkayChannel[Math.floor(Math.random() * itsOkayChannel.length)];
  let fetchedChannel = await client.channels.fetch(`${randomChannel}`)
  if (!fetchedChannel) return console.log(`The channel ${randomChannel} is invaild, check config again!`)

  let channelMessages = await fetchedChannel.messages.fetch({limit: 5, before: `${snowflakeGen1}`})
  let filteredMessagesOnce = channelMessages.filter(m => m.author.id !== itsNotOkayUserID.find((id) => id === m.author.id))
  let filteredMessages = filteredMessagesOnce.filter(m => m.content !== '')

  let channelMessages1 = await fetchedChannel.messages.fetch({limit: 5, before: `${snowflakeGen2}`})
  let filteredMessagesTwice = channelMessages1.filter(m => m.author.id !== itsNotOkayUserID.find((id) => id === m.author.id))
  let filteredMessages2 = filteredMessagesTwice.filter(m => m.content !== '')

  let channelMessages2 = await fetchedChannel.messages.fetch({limit: 5, before: `${snowflakeGen3}`})
  let filteredMessagesThrice = channelMessages2.filter(m => m.author.id !== itsNotOkayUserID.find((id) => id === m.author.id))
  let filteredMessages3 = filteredMessagesThrice.filter(m => m.content !== '')


  function getRandomItem(set) {
    let items = Array.from(set);
    return items[Math.floor(Math.random() * items.length)];
}

  let randomMessageMain = getRandomItem(filteredMessages)
  let randomMessageSecond = getRandomItem(filteredMessages2)
  let randomMessageThird = getRandomItem(filteredMessages3)

  do {
    randomMessageSecond = getRandomItem(filteredMessages2)
    let count1 = 0 
    count1 = count1 + 1
    if (count1 = 5) break
  } while (randomMessageSecond[1].author.username === randomMessageMain[1].author.username)

  do {
    randomMessageThird = getRandomItem(filteredMessages3)
    let count1 = 0 
    count1 = count1 + 1
    if (count1 = 5) break
  } while (randomMessageThird[1].author.username === randomMessageMain[1].author.username && randomMessageSecond[1].author.username === randomMessageThird[1].author.username)

  let arr = [ ]
  arr.push(randomMessageMain[1].author.username)
  arr.push(randomMessageSecond[1].author.username)
  arr.push(randomMessageThird[1].author.username)

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffleArray(arr)


let embed = new Discord.MessageEmbed()
  .setColor('#47FC74')
  .setTitle(`Here's a new random message!`)
  .setDescription(`\n\`\`\`${randomMessageMain[1].content}\`\`\`\nI wonder who it is, could it be:\n ● **${arr[0]}**\n● **${arr[1]}**\n● **${arr[2]}**\n\n**30 seconds starts now!**\n (so dont fuck up)`)
  .setFooter(`Player: ${message.member.user.tag}`)
  message.channel.send({embeds: [embed]})
  let userFilter = m => m.author.id === message.author.id
  let userResponse = await message.channel.awaitMessages({filter: userFilter, max: 1, time: 30000, errors: ['time']}).catch(error => {
    message.channel.send(`Timeout ${message.author}! The correct answer was **${randomMessageMain[1].author.username}**`)
    return
})
if (typeof userResponse == 'undefined') {
  return
}
let userGuess = userResponse.map(msg => msg.content).join(' ')

  if (userGuess.toLowerCase() === randomMessageMain[1].author.username.toLowerCase()) {
    message.channel.send(`wow you win (you dont suck)!!!! the correct answer was **${randomMessageMain[1].author.username}**, you said **${userGuess}**`)
    return
  } else {
    message.channel.send(`wow you suck (good job idiot)!!!! the correct answer was **${randomMessageMain[1].author.username}**, you said **${userGuess}**`)
    return
  }
  },
}