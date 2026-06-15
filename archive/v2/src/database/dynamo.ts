import { DeleteItemCommand, GetItemCommand, PutItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";

const { DynamoDBClient, DescribeTableCommand } = require("@aws-sdk/client-dynamodb");
require("dotenv").config();
const chalk = require("chalk");

const dynamoClient = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const LOBBY_TABLE = process.env.DYNAMO_LOBBY_TABLE;
const TEMP_TABLE = process.env.DYNAMO_TEMP_TABLE;
const WELCOME_TABLE = process.env.DYNAMO_WELCOME_TABLE;

export const checkConnection = async () => {
  const tablesToCheck = [LOBBY_TABLE, TEMP_TABLE];

  for (const tableName of tablesToCheck) {
    const command = new DescribeTableCommand({
      TableName: tableName,
    });

    try {
      const data = await dynamoClient.send(command);
      console.log(chalk.blue(`AWS DynamoDB (${tableName}): ${chalk.green.bold("Connected")}`));
    } catch (error) {
      console.log(chalk.blue(`AWS DynamoDB (${tableName}): ${chalk.red.bold("Error")}`));
    }
  }
};

export const getLobbyChannel = async (guildId, channelId) => {
  const params = {
    TableName: LOBBY_TABLE,
    Key: {
      guildId: { S: guildId },
      channelId: { S: channelId },
    },
  };
  try {
    const { Item } = await dynamoClient.send(new GetItemCommand(params));
    if (!Item) return null;

    return {
      guildId: Item.guildId.S,
      channelId: Item.channelId.S,
      listInput: Item.listInput?.L.map((input) => input.S) || [],
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const saveLobbyChannel = async (guildId, channelId, listInput) => {
  const params = {
    TableName: LOBBY_TABLE,
    Item: {
      guildId: { S: guildId },
      channelId: { S: channelId },
      listInput: { L: listInput.map((item) => ({ S: item })) },
    },
  };

  try {
    await dynamoClient.send(new PutItemCommand(params));
  } catch (error) {
    console.error("Error saving channel to DynamoDB:", error);
    throw error;
  }
};

export const getTempChannel = async (guildId, channelId) => {
  const params = {
    TableName: TEMP_TABLE,
    Key: {
      guildId: { S: guildId },
      channelId: { S: channelId },
    },
  };
  try {
    const { Item } = await dynamoClient.send(new GetItemCommand(params));
    if (!Item) return null;

    return {
      guildId: Item.guildId.S,
      channelId: Item.channelId.S,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteTempChannel = async (guildId, channelId) => {
  const params = {
    TableName: TEMP_TABLE,
    Key: {
      guildId: { S: guildId },
      channelId: { S: channelId },
    },
  };

  try {
    const result = await dynamoClient.send(new DeleteItemCommand(params));
    return result;
  } catch (error) {
    console.error(`Error deleting channel with ID: ${channelId}`, error);
    throw error;
  }
};

export const saveTempChannel = async (guildId, channelId) => {
  const params = {
    TableName: TEMP_TABLE,
    Item: {
      guildId: { S: guildId },
      channelId: { S: channelId },
    },
  };

  try {
    await dynamoClient.send(new PutItemCommand(params));
  } catch (error) {
    console.error("Error saving channel to DynamoDB:", error);
    throw error;
  }
};

export const deleteAllLobbyChannels = async (guildId) => {
  const params = {
    TableName: LOBBY_TABLE,
    FilterExpression: "guildId = :guildId",
    ExpressionAttributeValues: {
      ":guildId": { S: guildId },
    },
  };

  try {
    // Étape 1 : Scanner pour trouver tous les items avec ce guildId
    const scanResult = await dynamoClient.send(new ScanCommand(params));

    if (scanResult.Items.length === 0) {
      console.log(`No items found for guild ${guildId}.`);
      return;
    }

    console.log(`Found ${scanResult.Items.length} items to delete for guild ${guildId}.`);

    // Étape 2 : Supprimer chaque élément trouvé
    for (const item of scanResult.Items) {
      const deleteParams = {
        TableName: LOBBY_TABLE,
        Key: {
          guildId: { S: item.guildId.S },
          channelId: { S: item.channelId.S }, // Assurez-vous que votre table a un attribut `channelId`
        },
      };

      await dynamoClient.send(new DeleteItemCommand(deleteParams));
    }

    console.log(`Successfully deleted all channels for guild ${guildId}.`);
  } catch (error) {
    console.error(`Error deleting channels for guild ${guildId}`, error);
    throw error;
  }
};

export const deleteLobbyChannel = async (guildId, channelId) => {
  const params = {
    TableName: LOBBY_TABLE,
    Key: {
      guildId: { S: guildId },
      channelId: { S: channelId },
    },
  };

  try {
    const result = await dynamoClient.send(new DeleteItemCommand(params));
    return result;
  } catch (error) {
    console.error(`Error deleting channel with ID: ${channelId}`, error);
    throw error;
  }
};

export const setNewMemberWelcome = async (
  guildId,
  activated = true,
  backgroundImage,
  color = "#FFFFFF",
  quote = ""
) => {
  const params = {
    TableName: WELCOME_TABLE,
    Item: {
      guildId: { S: guildId },
      activated: { BOOL: true },
      backgroundImage: { S: backgroundImage },
      color: { S: color },
      quote: { S: quote },
    },
  };
  try {
    await dynamoClient.send(new PutItemCommand(params));
  } catch (error) {
    console.error("Error saving welcome message configuration to DynamoDB:", error);
    throw error;
  }
};

export const getNewMemberWelcome = async (guildId) => {
  const params = {
    TableName: WELCOME_TABLE,
    Key: {
      guildId: { S: guildId },
    },
  };
  try {
    const { Item } = await dynamoClient.send(new GetItemCommand(params));
    if (!Item) return null;

    return {
      guildId: Item.guildId.S,
      activated: Item.activated.BOOL,
      backgroundImage: Item.backgroundImage.S,
      color: Item.color.S,
      quote: Item.quote.S,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};
