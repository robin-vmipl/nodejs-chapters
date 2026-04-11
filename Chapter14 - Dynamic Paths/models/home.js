// Core Modules
const fs = require("fs");
const path = require("path");

const rootDir = require("../utils/pathUtils"); //local module
const homeDataPath = path.join(rootDir, "data", "homes.json");

let registeredHomes = [];

module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }

  save() {
    this.id = Math.random().toString(); // Generate a unique ID for the home
    Home.fetchAll((registeredHomes) => {
      registeredHomes.push(this);
      fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), (err) => {
        if (err) {
          console.error("Error saving home data:", err);
        } else {
          console.log("Home data saved successfully.");
        }
      });
    });
  }

  static fetchAll(callback) {
    fs.readFile(homeDataPath, (err, data) => {
      if (!err) {
        callback(JSON.parse(data));
      } else {
        callback([]);
      }
    });
  }

  static findById(homeId, callback) {
    this.fetchAll((registeredHomes) => {
      const home = registeredHomes.find((home) => home.id === homeId);
      callback(home);
    });
  }
};
