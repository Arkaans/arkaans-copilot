module.exports = {
  name: "connected",
  execute(client) {
    const info = '\x1b[32m';
    const reset = '\x1b[0m';
    console.log(info, `MongoDB Database is now connect`, reset);
  },
};