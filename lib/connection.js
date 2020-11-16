const mongoose = require("mongoose");

mongoose.connect(
  process.env.DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    //error condition
    console.log(`mongodb connected!`);
  }
);

module.exports = mongoose;
