const mongoose = require("mongoose");

function connectdb() {
  mongoose
    .connect(
      process.env.DB_CONNECT
      // It's good to include this option for stability
    )
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      console.log("Error connecting to DB: ", err);
    });
}
module.exports = connectdb;
