const Discord = module.require('discord.js');
const { itsOkayChannel } = require('../../config/config.json')

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
    time.setDate(time.getDate() - 2)
    //console.log(time)
    let snowflakeGen = Discord.SnowflakeUtil.generate(time)
    //console.log(snowflakeGen)

    //pick our channel
    //console.log(itsOkayChannel)
    let randomChannel = itsOkayChannel[Math.floor(Math.random() * itsOkayChannel.length)];
    //console.log(randomChannel)
    let fetchedChannel = await client.channels.fetch(`${randomChannel}`)
    //console.log(fetchedChannel)
    if (!fetchedChannel) return console.log(`The channel ${randomChannel} is invaild, check config again!`)
    let channelMessages = await fetchedChannel.messages.fetch({limit: 30, before: `${snowflakeGen}`})
    let filteredMessages = channelMessages.filter(m => m.content !== '')
    //console.log(filteredMessages)
    function getRandomItem(set) {
      let items = Array.from(set);
      return items[Math.floor(Math.random() * items.length)];
  }
    let randomMessageMain = getRandomItem(filteredMessages)
    let randomMessageSecond = getRandomItem(filteredMessages)
    let randomMessageThird = getRandomItem(filteredMessages)
    console.log(`answer: `, randomMessageMain[1].author.username)
    while (randomMessageSecond[1].author.username == randomMessageMain[1].author.username || randomMessageSecond[1].author.username == randomMessageThird[1].author.username) {
      let count1 = 0 
      count1 = count1 + 1
      console.log(count1)
      if(count1 < 30) {
      randomMessageSecond = getRandomItem(filteredMessages)
      console.log(randomMessageSecond[1].author.username)
      }
      if (count1 = 30) {
        console.log(`we fucked up, choosing whatever's left`)
        break
      }
    }
     while (randomMessageThird[1].author.username === randomMessageMain[1].author.username || randomMessageSecond[1].author.username === randomMessageThird[1].author.username) {
      let count2 = 0 
      count2 = count2 + 1
      console.log(count2)
      if(count2 < 30){ 
      randomMessageThird = getRandomItem(filteredMessages)
      console.log(randomMessageThird[1].author.username)
    }
      if (count2 = 30) {
        console.log(`we fucked up, choosing whatever's left`)
        break
      }
    }
    //console.log(randomMessageSecond[1].author.username)
    //console.log(randomMessageThird[1].author.username)
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
  //console.log(arr)
  let embed = new Discord.MessageEmbed()
    .setColor('#47FC74')
    .setDescription(`Here's this new random message: "${randomMessageMain[1].content}"\n Guess who it is! Could it be\n 1.**${arr[0]}**\n2.**${arr[1]}**\n3.**${arr[2]}**\n30 seconds starts now (so dont fuck up)!\n (use usernames not numbers idiot)`)
    message.channel.send({embeds: [embed]})
    let userFilter = m => m.author.id === message.author.id
    let userResponse = await message.channel.awaitMessages({filter: userFilter, max: 1, time: 30000, errors: ['time']}).catch(error => {
      message.channel.send(`Timeout due to inactivity, the correct answer was ${randomMessageMain[1].author.username}`)
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