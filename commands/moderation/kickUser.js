const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick a user')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to kick')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reason for kicking the user')
                .setRequired(false)
        ),
    async execute(interaction) {
        if (interaction.user.id === '376774687209947136') {
            const user = interaction.options.getUser('user');
            const reason = interaction.options.getString('reason');
            const member = interaction.guild.members.cache.get(user.id);
            member.kick(reason);
            interaction.reply(`Kicked ${user.tag} for reason "${reason}"`);
        } else {
            interaction.reply('You do not have permission to use this command!');
        }
        if (interaction.user.id === '376774687209947136') {
            const user = interaction.options.getUser('user');
            const reason = interaction.options.getString('reason');
            const member = interaction.guild.members.cache.get(user.id);
            member.kick(reason);
            interaction.reply(`Kicked ${user.tag} for reason "${reason}"`);
        } else {
            interaction.reply('You do not have permission to use this command!');
        }
    }
}
