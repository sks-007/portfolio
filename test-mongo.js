const mongoose = require('mongoose');

const uri = "mongodb+srv://worksachinks_db_user:6vqZvgANYLAXrzUw@cluster0.gcssxkg.mongodb.net/portfolioDB?retryWrites=true&w=majority&appName=Cluster0";

async function run() {
  try {
    await mongoose.connect(uri);
    console.log("Successfully connected!");
    process.exit(0);
  } catch (err) {
    console.error("Connection error:", err);
    process.exit(1);
  }
}

run();
