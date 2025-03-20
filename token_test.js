// filepath: c:\Users\alexi\Documents\GitHub\discord-app\test-token.js
const { Client, GatewayIntentBits } = require('discord.js');
const config = require('./config.json');
const token = config.token.trim();

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.destroy(); // Close the connection after logging in
});

client.login(token).catch(console.error);