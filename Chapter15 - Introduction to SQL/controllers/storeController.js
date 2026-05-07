const Favourite = require("../models/favourite");
const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  Home.fetchAll()
    .then(([registeredHomes]) => {
      res.render("store/index", {
        registeredHomes: registeredHomes,
        pageTitle: "airbnb Home",
        currentPage: "index",
      });
    })
    .catch((error) => {
      console.error("Error fetching homes:", error);
      res.status(500).send("Internal Server Error");
    });
};

exports.getHomes = (req, res, next) => {
  Home.fetchAll()
    .then(([registeredHomes]) => {
      res.render("store/home-list", {
        registeredHomes: registeredHomes,
        pageTitle: "Homes List",
        currentPage: "homes",
      });
    })
    .catch((error) => {
      console.error("Error fetching homes:", error);
      res.status(500).send("Internal Server Error");
    });
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
  });
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.getFavourites((favouriteIds) => {
    Home.fetchAll()
      .then(([registeredHomes]) => {
        const favouriteHomes = registeredHomes.filter((home) =>
          favouriteIds.includes(home.id),
        );
        res.render("store/favourite-list", {
          favouriteHomes: favouriteHomes,
          pageTitle: "My Favourites",
          currentPage: "favourites",
        });
      })
      .catch((error) => {
        console.error("Error fetching homes:", error);
        res.status(500).send("Internal Server Error");
      });
  });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId)
    .then(([homes]) => {
      const homeDetails = homes[0]; // Assuming findById returns an array of results
      if (!homeDetails) {
        console.error("Home not found with ID:", homeId);
        res.redirect("/homes"); // Redirect to home page if home not found
      } else {
        res.render("store/home-details", {
          pageTitle: "Home Details",
          currentPage: "Home",
          homeId: homeId,
          home: homeDetails,
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching home details:", error);
      res.status(500).send("Internal Server Error");
    });
};

exports.postAddToFavourite = (req, res, next) => {
  console.log("Received request to add home to favourites:", req.body.id);
  Favourite.addToFavourite(req.body.id, (error) => {
    if (error) {
      console.error("Error adding home to favourites:", error);
    }
  });
  res.redirect("/favourites");
};

exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.deleteById(homeId, (error) => {
    if (error) {
      console.log("Error while removing from Favourite", error);
    }
    res.redirect("/favourites");
  });
};
