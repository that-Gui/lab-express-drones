// Iteration #1

const drones = [
    { name: "Creeper XL 500", propellers: 3, maxSpeed: 12 },
    { name: "Racer 57", propellers: 4, maxSpeed: 20 },
    { name: "Courier 3000i", propellers: 6, maxSpeed: 18 }
  ];

  // bin/seeds.js

const mongoose = require('mongoose');
const DroneC = require('../models/Drone.model.js');

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/lab-express-drones";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

// PASTE HERE THE LIST OF BOOKS PROVIDED IN THIS GIST: https://gist.github.com/ironhack-edu/2816267a015d4870f95275cb873d33b6

// const books = [...]

DroneC.create(drones).then(Element => {
    console.log(`Created ${Element.length} drones`);

    // Once created, close the DB connection
    mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred while creating drones from the DB: ${err}`));
