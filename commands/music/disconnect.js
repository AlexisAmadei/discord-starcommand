const { SlashCommandBuilder } = require('@discordjs/builders');
const { execute } = require('./youtube');
const { VoiceConnection, getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('disconnect')
        .setDescription('Disconnect the bot from voice channel'),
    async execute(interaction) {
        const botChannel = getVoiceConnection(interaction.guildId).disconnect();
    }
}