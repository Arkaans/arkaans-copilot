const { initializeBot } = require("./services/initializeBot");
const { initializeApp } = require("./services/initializeApp");
const { initializeDynamo } = require("./services/initializeDynamo");

initializeApp();
initializeBot();
initializeDynamo();
