const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
    editing: false,
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing;

  Home.findById(homeId).then((home) => {
    if (!home) {
      console.error("Home not found with ID:", homeId);
      return res.redirect("/host/host-home-list");
    }

    res.render("host/edit-home", {
      pageTitle: "Edit Home Details",
      currentPage: "host-homes",
      editing: editing,
      homeId: homeId,
      home: home,
    });
  });
};

exports.getHostHomes = (req, res, next) => {
  Home.fetchAll().then((registeredHomes) => {
    res.render("host/host-home-list", {
      pageTitle: "Host Homes List",
      currentPage: "host-homes",
      registeredHomes: registeredHomes,
    });
  });
};

exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, photoUrl, description } =
    req.body;

  const home = new Home(
    houseName,
    price,
    location,
    rating,
    photoUrl,
    description,
  );
  home.save().then(() => {
    console.log("Home added successfully");
  });

  res.redirect("/host/host-home-list");
};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, location, rating, photoUrl, description } =
    req.body;

  const home = new Home(
    houseName,
    price,
    location,
    rating,
    photoUrl,
    description,
    id,
  );
  home.save().then((result) => {
    console.log("Home updated successfully", result);
  });

  res.redirect("/host/host-home-list");
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("Came to delete ", homeId);
  Home.deleteById(homeId)
    .then(() => {
      res.redirect("/host/host-home-list");
    })
    .catch((error) => {
      console.log("Error while deleting ", error);
      res.redirect("/host/host-home-list");
    });
};
