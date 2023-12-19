const mongoose = require("mongoose");

const my_database_URL =
  "mongodb+srv://afro:afro@c1.ihyjm1m.mongodb.net/?retryWrites=true&w=majority";

try {
  mongoose.connect(my_database_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("Connection Established");
} catch (error) {
  console.log("Connection Failed", error);
}
