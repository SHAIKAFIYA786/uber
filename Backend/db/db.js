// const mongoose = require("mongoose");

// function connectdb() {
//   mongoose
//     .connect(
//       process.env.DB_CONNECT
//       // It's good to include this option for stability
//     )
//     .then(() => {
//       console.log("Connected to DB");
//     })
//     .catch((err) => {
//       console.log("Error connecting to DB: ", err);
//     });
// }
// module.exports = connectdb;


const mongoose = require("mongoose");

function connectdb() {
  const dbURL =
    process.env.NODE_ENV === "production"
      ? process.env.PROD_DB_URI // production DB connection URL (MongoDB Atlas)
      : process.env.LOCAL_DB_URI; // development DB connection URL (local MongoDB)

  // Log the database you're connecting to
  if (process.env.NODE_ENV === "production") {
    console.log("Connecting to MongoDB Atlas...");
  } else {
    console.log("Connecting to local MongoDB...");
  }

  mongoose
    .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      console.log("Error connecting to DB: ", err);
    });
}

module.exports = connectdb;

