const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    cooldown: 60,
    data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Display the tagged user avatar.')
    .addUserOption(option =>
        option.setName('user')
        .setDescription('The user\'s avatar to display')
        .setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const avatarEmbed = new EmbedBuilder()
            .setTitle(`${user.tag}'s avatar`)
            .setImage(user.displayAvatarURL({ dynamic: true, size: 512 }))
            await interaction.reply({ embeds: [avatarEmbed] });
    },
};