// Core Modules
const fs = require("fs");
const path = require("path");

const rootDir = require("../utils/pathUtils"); //local module
const favouriteDataPath = path.join(rootDir, "data", "favourite.json");

let registeredHomes = [];

module.exports = class Favourite {
  static addToFavourite(id, callback) {
    Favourite.getFavourites((favourites) => {
      if (!favourites.includes(id)) {
        favourites.push(id);
        fs.writeFile(favouriteDataPath, JSON.stringify(favourites), (err) => {
          if (err) {
            console.error("Error saving favourite data:", err);
          } else {
            console.log("Favourite data saved successfully.");
          }
          callback();
        });
      } else {
        console.log("Home is already in favourites.");
        callback();
      }
    });
  }

  static getFavourites(callback) {
    fs.readFile(favouriteDataPath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }
};
