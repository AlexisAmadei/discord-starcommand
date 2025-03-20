const { ChannelType, PermissionFlagsBits } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add-game')
        .setDescription('Creates a gaming section with a category, text channel, and voice channel.')
        .addStringOption(option =>
            option.setName('game-name')
                .setDescription('The name of the game.')
                .setRequired(true)
        )
        .addRoleOption(option =>
            option.setName('role')
                .setDescription('The role that can view the gaming category')
                .setRequired(true)
        ),
    async execute(interaction) {
        // Retrieve the selected role from the command option
        const role = interaction.options.getRole('role');
        const gameName = interaction.options.getString('game-name');

        try {
            // Create the category with permission overwrites:
            // - Deny everyone the VIEW_CHANNEL permission.
            // - Allow the selected role the VIEW_CHANNEL permission.

            if (!interaction.guild) {
                return interaction.reply({ content: 'This command can only be used in a server.', ephemeral: true });
            }
            const category = await interaction.guild.channels.create({
                name: gameName,
                type: ChannelType.GuildCategory,
                permissionOverwrites: [
                    {
                        id: interaction.guild.roles.everyone.id,
                        deny: [PermissionFlagsBits.ViewChannel],
                    },
                    {
                        id: role.id,
                        allow: [PermissionFlagsBits.ViewChannel],
                    },
                ],
            });

            // Create a text channel under the category.
            const textChannel = await interaction.guild.channels.create({
                name: gameName + '-chat',
                type: ChannelType.GuildText,
                parent: category.id,
            });

            // Create a voice channel under the category.
            const voiceChannel = await interaction.guild.channels.create({
                name: gameName + '-voice',
                type: ChannelType.GuildVoice,
                parent: category.id,
            });

            // Respond to the user that the gaming section has been created.
            await interaction.reply(`Gaming section created successfully! The role ${role.name} can view the category.`);
        } catch (error) {
            console.error('Error creating channels:', error);
            await interaction.reply({ content: 'There was an error while creating the gaming section.', ephemeral: true });
        }
    },
};
