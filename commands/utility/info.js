const { SlashCommandBuilder } = require('discord.js');
const { execute } = require('./server');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Get info about a user or a server!')
        .addSubcommand(subcommand =>
            subcommand
                .setName('user')
                .setDescription('Info about a user')
                .addUserOption(option => option.setName('target').setDescription('The user')))
        .addSubcommand(subcommand =>
            subcommand
                .setName('server')
                .setDescription('Info about the server')),
    async execute(interaction) {
        if (interaction.subcommand === 'user') {
            const userName = interaction.user.username;
            const userId = interaction.user.id;
            const member = interaction.member;
            const joinedDate = member.joinedAt;
            const joinedDay = joinedDate.toLocaleDateString('fr-FR', { day: 'numeric' });
            const joinedMonth = joinedDate.toLocaleDateString('fr-FR', { month: 'long' });
            const joinedYear = joinedDate.toLocaleDateString('fr-FR', { year: 'numeric' });

            const response = `*User Name:* **${userName}** \n` + `*User ID:* **${userId}** \n` + `You joined this server the **${joinedDay} ${joinedMonth} ${joinedYear}**.`;
            await interaction.reply(response);
        } else if (interaction.subcommand === 'server') {
            await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`);
        }
    }
};

