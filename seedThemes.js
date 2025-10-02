const sequelize = require('../config/database');
const Theme = require('../models/Theme');

const themes = [
  { name: 'javaScript' },
  { name: 'nodejs' },
  { name: 'nestjs' },
  { name: 'reactjs' },
  { name: 'nextjs' },
];

async function seedThemes() {
  try {
    await sequelize.sync();
    for (const theme of themes) {
      await Theme.findOrCreate({ where: { name: theme.name } });
    }
    console.log('Thèmes insérés avec succès !');
    process.exit(0);
  } catch (err) {
    console.error("Erreur lors de l'insertion des thèmes :", err);
    process.exit(1);
  }
}

seedThemes();
