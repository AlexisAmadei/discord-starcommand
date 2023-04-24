const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pfc")
        .setDescription("Pierre Feuille Ciseaux. En 1 manche. T'as déjà perdu.")
        .addStringOption(option =>
            option.setName("choix")
                .setDescription("Choisissez entre Pierre, Feuille ou Ciseaux")
                .setRequired(true)
                .addChoices(
                    { name: "Pierre", value: "pierre" },
                    { name: "Feuille", value: "feuille" },
                    { name: "Ciseaux", value: "ciseaux" }
                )
        ),
    async execute(interaction) {
        const userChoice = interaction.options.getString("choix");
        const botChoice = ["pierre", "feuille", "ciseaux"][Math.floor(Math.random() * 3)];
        let result = null;
        if (userChoice === botChoice) {
            result = "Egalité !";
        } else if ((botChoice === "pierre" && userChoice === "ciseaux") ||
            (botChoice === "feuille" && userChoice === "pierre") ||
            (botChoice === "ciseaux" && userChoice === "feuille")) {
            result = "J'ai gagné !";
        } else {
            result = "J'ai perdu...";
        }
        await interaction.reply(`J'ai choisi ${botChoice}, ${result}`);
    }
};