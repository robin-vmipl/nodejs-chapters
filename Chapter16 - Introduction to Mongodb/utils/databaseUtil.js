const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;

const MONGO_URI =
  "mongodb+srv://robinsingh3233_db_user:robinsingh3233_db_user@cluster0.slagvum.mongodb.net/?appName=Cluster0";

let _db;
const mongoClient = (callback) => {
  MongoClient.connect(MONGO_URI)
    .then((client) => {
      callback();
      _db = client.db("airbnb");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB", err);
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw new Error("No database found!");
};

exports.mongoClient = mongoClient;
exports.getDb = getDb;
