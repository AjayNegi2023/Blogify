const mongoose = require("mongoose");

const DB_CONNECTION = async (URL) => {
  return await mongoose.connect(URL);
};

module.exports = { DB_CONNECTION };
