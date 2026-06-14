export const getGuilds = (client) => {
  const servers = client.guilds.cache.size;
  return servers;
};
