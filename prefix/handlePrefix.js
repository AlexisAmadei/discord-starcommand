const { joinVoiceChannel } = require('discord.js')

function handlePrefix(message) {
    let messageArray = [];
    let args = null;

    if (message.content === 'ping') {
        console.log(`# ${new Date().toString().slice(4, 24)} --> Nouveau message de ${message.author.username} avec ping`);
        message.channel.send('pong !');
    }
    if (message.content[0] === '-') {
        messageArray = message.content.split(' ');
        if (messageArray[0] === '-deezer') {
            args = messageArray[1];
        }
        console.log(`# ${messageArray[0]}`);
    }
}

module.exports = handlePrefix;