require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
//mongoose connection
require("./lib/connection");

//middewares
app.use(express.json());
app.use(cors()); //allow everyone access
//routes
app.use("/todos", require("./routes/todos.routes"));

app.listen(process.env.PORT, () =>
  console.log(`running on ${process.env.PORT}`)
);
