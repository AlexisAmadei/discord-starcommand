const { SlashCommandBuilder }= require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('date')
        .setDescription('Replies with the current date and time.'),
    async execute(interaction) {
        const currentDate = new Date();
        const day = currentDate.toLocaleDateString('en-US', { day: 'numeric' });
        const month = currentDate.toLocaleDateString('en-US', { month: 'long' });
        const year = currentDate.toLocaleDateString('en-US', { year: 'numeric' });
        const response = 'Today is ' + day + ' ' + month + ', ' + year + '.';
        await interaction.reply(response);
    },
};