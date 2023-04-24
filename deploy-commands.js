const { REST, Routes } = require('discord.js');
const { clientId, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');
const client = require('./index.js');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');

function readCommands(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      readCommands(filePath);
    } else if (file.endsWith('.js')) {
      const command = require(filePath);
      commands.push(command.data.toJSON());
    }
  }
}
readCommands(commandsPath);
const rest = new REST({ version: '10' }).setToken(token);
(async () => {
  try {
    console.log(`# Raffraichissement de  ${commands.length} (/) commandes...`);
    const data = await rest.put(
      Routes.applicationCommands(clientId), { body: commands },
    );
    console.log(`# Succès de ${data.length} (/) commandes.`);
  } catch (error) {
    console.error(error);
  }

  // Delete all global commands
  // rest.put(Routes.applicationGuildCommands(clientId), { body: [] })
	// .then(() => console.log('Successfully deleted all guild commands.'))
	// .catch(console.error);

})();
