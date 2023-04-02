const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('createtextchannel')
        .setDescription('Create a text channel')
        .addStringOption(option => option
            .setName('channelname')
            .setDescription('Define the name of the channel')
            .setRequired(false)),
    async execute(interaction) {
        const channelName = interaction.options.getString('nametogive') ?? 'textchannel';
        const channel = await interaction.guild.channels.create(
            channelName, { type: ChannelType.GuildText }
        );
        await interaction.reply(`Created ${channel}`);
    }
}
