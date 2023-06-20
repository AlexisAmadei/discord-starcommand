const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a user')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user to ban')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reason for banning the user')
                .setRequired(false)
        ),
    async execute(interaction) {
        const user = interaction.options.getUser('target');
        const reason = interaction.options.getString("reason") || "No reason provided.";
        const member = await interaction.guild.members.fetch(user.id);

        const errEmbed = new EmbedBuilder()
            .setDescription(`You can't take action on ${user.username}.`)
            .setColor(0xc72c3b);

        await member.ban({ reason });
        const embed = new EmbedBuilder()
            .setDescription(`Successfuly banned ${user} with reason: ${reason}.`)
            .setColor(0x5fb041)
            .setTimestamp()
        await interaction.reply({
            embeds: [embed]
        });
    }
}
