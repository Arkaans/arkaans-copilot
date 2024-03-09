module.exports = {
  name: "connecting",
  execute(client) {
    const trace = '\x1b[36m';
    const handle = '\x1b[33m';
    const reset = '\x1b[0m';

    console.log(trace, `=> HANDLING MONGODB DATABASE <=`, reset);
    console.log(handle, `Connecting to MongoDB Database`, reset);
  },
};
