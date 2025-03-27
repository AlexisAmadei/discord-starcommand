const { SlashCommandBuilder } = require("discord.js");

const embed = {
    color: 0x0099ff,
    title: "List of commands",
    description: "Here are the available commands:",
    fields: [
        {
            name: "Documentation",
            value: "Visit [GitHub Repository](https://github.com/AlexisAmadei/discord-starcommand) to see the docs and list of commands."
        }
    ]
};

module.exports = {
    cooldown: 60,
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("List all available commands."),
    async execute(interaction) {
        await interaction.reply({ embeds: [embed] });
    }
};