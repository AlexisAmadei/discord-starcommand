const { ChannelType, PermissionFlagsBits, ConnectionVisibility } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add-game')
        .setDescription('Creates a game category, text channel, and voice channel. If none provided, created automatically.')
        .addStringOption(option =>
            option.setName('game-name')
                .setDescription('The name of the game.')
                .setRequired(true)
        )
        .addRoleOption(option =>
            option.setName('role')
            .setDescription('The role that can view the gaming category (optional). If not provided, a new role will be created.')
                .setRequired(false)
        ),
    async execute(interaction) {
        const gameName = interaction.options.getString('game-name');
        let role = interaction.options.getRole('role');

        if (!interaction.guild) {
            return interaction.reply({ content: 'This command can only be used in a server.', ephemeral: true });
        }

        if (!role) {
            await interaction.deferReply({ ephemeral: true }); // Defer reply without content
        }

        try {
            // If no role is provided, propose creating a new one
            if (!role) {
                const roleName = `${gameName}`;
                role = await interaction.guild.roles.create({
                    name: roleName,
                    reason: `Role created for the ${gameName} gaming section.`,
                    hoist: true, // Show the role separately in the member list
                    mentionable: true, // Make the role mentionable
                    permissions: [
                        PermissionFlagsBits.ViewChannel,
                        PermissionFlagsBits.SendMessages,
                        PermissionFlagsBits.Connect,
                        PermissionFlagsBits.Speak,
                    ],
                });

                // Send a follow-up message after the role is created
                await interaction.followUp(`No role was provided. A new role "${roleName}" has been created.`);
            }

            // Create the category with permission overwrites
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

            // Create a text channel under the category
            const textChannel = await interaction.guild.channels.create({
                name: gameName + '-chat',
                type: ChannelType.GuildText,
                parent: category.id,
            });

            // Create a voice channel under the category
            const voiceChannel = await interaction.guild.channels.create({
                name: gameName + '-voice',
                type: ChannelType.GuildVoice,
                parent: category.id,
            });

            // Respond to the user that the gaming section has been created
            await interaction.followUp(`Gaming section created successfully! The role ${role.name} can view the category.`);
        } catch (error) {
            console.error('Error creating channels or role:', error);
            await interaction.followUp({ content: 'There was an error while creating the gaming section.', ephemeral: true });
        }
    },
};
