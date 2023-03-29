const { SlashCommandBuilder } = require('discord.js');
const { execute } = require('./ping');

ModalSubmitFields.export = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Get user info'),
    async execute(interaction) {
        await interaction.reply('This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.')
    },
}