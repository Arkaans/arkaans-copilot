const express = require("express");
const app = express();
const { getRoutes } = require("../services/getRoutes.js");
const { getVersion } = require("../services/getVersion.js");
const chalk = require("chalk");
require("dotenv").config();

async function initializeApp() {
  const port = process.env.PORT || 3000;

  app.use(express.json());

  getRoutes(app);

  const version = await getVersion();
  if (!version) {
    console.log("Impossible de récupérer la version.");
  }

  app.listen(port, () => {
    console.log(chalk.yellow.bold(`\nArkaans Copilot ${version}\n`));
    console.log(chalk.blue(`Port: ${chalk.green.bold(port)}`));
  });
}

module.exports = { initializeApp };
