const { checkConnection } = require("../database/dynamo");

function initializeDynamo() {
  checkConnection();
}

module.exports = { initializeDynamo };
