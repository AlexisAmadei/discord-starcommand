const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    cooldown: 300,
    data: new SlashCommandBuilder()
        .setName('reload-slash')
        .setDescription('Reloads all slash commands.'),
    async execute(interaction) {
        const permission = interaction.member.permissions.has('ADMINISTRATOR');
        if (!permission) {
            return interaction.reply("You don't have the permission to use this command.");
        }

        console.log('Reloading slash commands...');
        return interaction.reply('Reloading slash commands...');
    }
};