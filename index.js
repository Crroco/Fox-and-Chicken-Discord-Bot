const Discord = require(`discord.js`);

const client = new Discord.Client();
const config = require(`./config.json`);
const stats = require(`./Card stats.json`);

client.on(`ready`, () => {
    console.log(`Ready!`);
})

function showCards(channel){

    let i, stopFox = stats.foxes.length, stopChick = stats.chickens.length;
    //console.log(stats.foxes.length, stats.chickens.length);

    let fx, cck;

    fx = cck = '';

    for(i = 0; i < stopChick; ++i)
        cck += stats.chickens[i], cck += '\n';

    for(i = 0; i < stopFox; ++i)
        fx += stats.foxes[i], fx += '\n';
        
    const embededMessage = new Discord.MessageEmbed()
    .setColor('#0099ff')
	.setTitle('Cards of Fox and Chicken')
	//.setURL('https://discord.js.org/')
	.setAuthor('Storyteller', 'https://img.freepik.com/free-vector/grandfather-reading-story-book-his-little-grandchild-happy-grandparents-day-concept-story-time-with-grandpa-flat-illustration_204997-72.jpg?size=338&ext=jpg')
	//.setDescription('Some description here')
	.setThumbnail('https://cf.geekdo-images.com/t1wVFEI2w_gjtAero8ifNA__itemrep/img/pa9ngl88U2AMu-VIj5TKR0AFuWg=/fit-in/246x300/filters:strip_icc()/pic1903817.jpg')
	/*.addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)*/
	.addField('Chickens', cck, false)
    .addField('Foxes', fx, false)
	//.setImage('https://i.imgur.com/wSTFkRM.png')
	.setTimestamp()
	.setFooter('Powered by Crroco', 'https://i.pinimg.com/originals/75/98/d1/7598d103a735d5568964e4967e42823d.gif');
    
    channel.send(embededMessage);
}

function helpCommand(channel){
    ///a bit hard to understand
    ///the first commands is the variable name, the second one is the array from the commands.json in the same directory as index.js
    let commands = require(`./commands.json`), i, stop, mes;
    stop = commands.commands.length;
    mes = ``;

    for(i = 0; i < stop; ++i){
        if(commands.ready2use[i] == true)
            mes += `:white_check_mark: `;
        else mes += `:x: `;

        mes += `**${commands.commands[i]}**` + '\n' + commands.description[i] + '\n\n';
    }
        
    
    
    const embededMessage = new Discord.MessageEmbed()
    .setColor('#0099ff')
	.setTitle('Commands of the bot')
	//.setURL('https://discord.js.org/')
	.setAuthor('Game Bot', 'https://miro.medium.com/max/962/1*I9KrlBSL9cZmpQU3T2nq-A.jpeg')
	//.setDescription('Some description here')
	.setThumbnail('https://cf.geekdo-images.com/t1wVFEI2w_gjtAero8ifNA__itemrep/img/pa9ngl88U2AMu-VIj5TKR0AFuWg=/fit-in/246x300/filters:strip_icc()/pic1903817.jpg')
	/*.addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)*/
	.addField(':white_check_mark: - available command\n\n:x: - command under maintenance\n\n\u200B', '\n' + mes, false)
	//.setImage('https://i.imgur.com/wSTFkRM.png')
	.setTimestamp()
	.setFooter('Powered by Crroco', 'https://i.pinimg.com/originals/75/98/d1/7598d103a735d5568964e4967e42823d.gif');

    channel.send(embededMessage);
}

function seeCard(cardName, channel){

    let currentCardStats;// = require(`./Cards/${cardName}.json`);
    let i, stop, cardFound, cardType;
    cardFound = false;
    stop = stats.chickens.length;

    for(i = 0; i < stop; ++i)
        if(cardName == stats.chickens[i]){
            currentCardStats = require(`./Cards/${cardName}.json`);
            cardFound = true;
            cardType = 'Chicken';
            i = stop;
        }
    

    stop = stats.foxes.length;

    for(i = 0; i < stop; ++i)
        if(cardName == stats.foxes[i]){
            currentCardStats = require(`./Cards/${cardName}.json`);
            cardFound = true;
            cardType = 'Fox';
            i = stop;
        }
    
    let mes;

    if(cardFound == false){
        //imgURL = `https://cdn.dribbble.com/users/1141304/screenshots/2806499/screen_shot_2016-06-28_at_10.33.04_pm.png`;
        mes = `The card you are looking for is not in our database. Be careful as the searching algorithm is case sensitive. This means b is different from B.`;

        const embededMessage = new Discord.MessageEmbed()
        .setColor('#0099ff')
	    .setTitle(`Card not found`)
	    //.setURL('https://discord.js.org/')
	    .setAuthor('Game Bot', 'https://miro.medium.com/max/962/1*I9KrlBSL9cZmpQU3T2nq-A.jpeg')
	    //.setDescription('Some description here')
	    .setThumbnail(`https://cdn.dribbble.com/users/1141304/screenshots/2806499/screen_shot_2016-06-28_at_10.33.04_pm.png`)
	    .addFields(
		    { name: '\u200B', value: `${mes}`, inline: false },
            { name: '\u200B', value: '\u200B'}
	    )
        //.addField('\0', mes, false)
	    //.setImage('https://i.imgur.com/wSTFkRM.png')
	    .setTimestamp()
	    .setFooter('Powered by Crroco', 'https://i.pinimg.com/originals/75/98/d1/7598d103a735d5568964e4967e42823d.gif');
        
        channel.send(embededMessage);
    }
    else{
    
        //mes = `**Card type** - ${currentCardStats.cardType}\n**Winning** - ${currentCardStats.winning}`;

        const embededMessage = new Discord.MessageEmbed()
        .setColor('#0099ff')
	    .setTitle(`${cardName}`)
	    .setURL(`${currentCardStats.URL}`)
	    .setAuthor('Game Bot', 'https://miro.medium.com/max/962/1*I9KrlBSL9cZmpQU3T2nq-A.jpeg')
	    .setDescription(`${currentCardStats.description}`)
	    .setThumbnail(`${currentCardStats.URL}`)
	    .addFields(
		    { name: '\u200B', value: '\u200B' },
		    { name: 'Card Type', value: `${currentCardStats.cardType}`, inline: true },
		    //{ name: 'Winning', value: `${currentCardStats.winning}`, inline: true },
            { name: '\u200B', value: '\u200B' },
	    )
	    //.addField('More stats', mes, false)
	    //.setImage('https://i.imgur.com/wSTFkRM.png')
	    .setTimestamp()
	    .setFooter('Powered by Crroco', 'https://i.pinimg.com/originals/75/98/d1/7598d103a735d5568964e4967e42823d.gif');

        channel.send(embededMessage);
    }

    
}

function writeCredits(channel){

    let mes;
    mes = `The authors of the Card Game are Stephanie Burrows Fox & Michael Fox.\n\nThe bot was implemented by Crroco.`;

    const embededMessage = new Discord.MessageEmbed()
    .setColor('#0099ff')
	.setTitle('Credits')
	//.setURL('https://discord.js.org/')
	.setAuthor('Game Bot', 'https://miro.medium.com/max/962/1*I9KrlBSL9cZmpQU3T2nq-A.jpeg')
	//.setDescription('Some description here')
	.setThumbnail('https://cf.geekdo-images.com/t1wVFEI2w_gjtAero8ifNA__itemrep/img/pa9ngl88U2AMu-VIj5TKR0AFuWg=/fit-in/246x300/filters:strip_icc()/pic1903817.jpg')
	/*.addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)*/
	.addField('\u200B', '\n' + mes, false)
    .addField('\u200B', '\u200B')
	//.setImage('https://i.imgur.com/wSTFkRM.png')
	.setTimestamp()
	.setFooter('Powered by Crroco', 'https://i.pinimg.com/originals/75/98/d1/7598d103a735d5568964e4967e42823d.gif');

    channel.send(embededMessage);
}

client.on(`message`, message => {

    if(message.content == `${config.prefix}cards`)
        showCards(message.channel);
    else if(message.content == `${config.prefix}credits`)
        writeCredits(message.channel);
    else if(message.content == `${config.prefix}help`)
        helpCommand(message.channel);
    else if(message.content.startsWith(`${config.prefix}c`))
        seeCard(message.content.slice(config.prefix.length + 2), message.channel);
})

client.login(config.token);