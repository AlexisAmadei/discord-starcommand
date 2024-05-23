const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, ActivityType } = require('discord.js');
const { token } = require('./config.json');
const readTerminal = require('./utils/readTerminal.js');
const handlePrefix = require('./prefix/handlePrefix.js');

readTerminal.on('line', (input) => {
    if (input === 'quit') {
        readTerminal.close();
        process.exit(0);
    }
    if (input === 'clear') {
        console.clear();
        console.log('# Terminal cleared.');
    }
    if (input === 'help') {
        console.log('Commandes disponibles: ');
        console.log(' - "quit" pour quitter le bot.');
        console.log(' - "clear" pour effacer le terminal.');
    }
});

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
    ]
});

module.exports = client;
client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolder = fs.readdirSync(foldersPath);

for (const folder of commandFolder) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

client.login(token);
client.on('error', console.error);

client.once(Events.ClientReady, () => {
    const activityStatus = "ce qu'il se passe.."
    console.log(`# Bot connecté sous => ${client.user.tag}`);
    client.user.setActivity(activityStatus, { type: ActivityType.Watching });
    console.log(`# Discord Status => "${activityStatus}"`);
});

client.on('messageCreate', (message) => {
    handlePrefix(message);
});

client.on(Events.InteractionCreate, async interaction => {
    const logDate = new Date().toString().slice(4, 24);
    if (!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
        console.error(`Aucun commande avec ${interaction.commandName} trouvée.`);
        return;
    }
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'Erreur avec la commande', ephemeral: true });
        } else {
            await interaction.reply({ content: 'Erreur avec la commande', ephemeral: true });
        }
    }
    console.log(`# ${logDate} --> Nouvelle interraction de ${interaction.user.username} avec (/) ${interaction.commandName}`);
});
