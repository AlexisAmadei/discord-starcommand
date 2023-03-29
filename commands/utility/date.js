const { SlashCommandBuilder }= require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('date')
        .setDescription('Replies with the current date and time.'),
    async execute(interaction) {
        await interaction.reply('The current date and time is ${new Date()}');
    },
};