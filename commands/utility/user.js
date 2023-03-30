const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Get user info'),
    async execute(interaction) {
        const userName = interaction.user.username;
        const userId = interaction.user.id;
        const member = interaction.member;

        const joinedDate = member.joinedAt;
        const joinedDay = joinedDate.toLocaleDateString('fr-FR', { day: 'numeric' });
        const joinedMonth = joinedDate.toLocaleDateString('fr-FR', { month: 'long' });
        const joinedYear = joinedDate.toLocaleDateString('fr-FR', { year: 'numeric' });

        const response = `*User Name:* **${userName}** \n` + `*User ID:* **${userId}** \n` + `You joined this server the **${joinedDay} ${joinedMonth} ${joinedYear}**.`;
        await interaction.reply(response);
    },
}
