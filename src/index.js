// imports
const app = require("./server");
const { config } = require("./config");
const { connect } = require("./db");

// Connection
connect().then(() => {
  console.log("Database Connected");
  app.listen(config.app.PORT, () =>
    console.log("Server running on port: " + config.app.PORT)
  );
});
