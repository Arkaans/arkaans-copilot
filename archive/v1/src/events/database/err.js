module.exports = {
  name: "err",
  execute(err) {
    console.log(`Database Error: ${err}`);
  },
};
