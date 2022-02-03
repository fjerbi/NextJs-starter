const Room = require("../models/room");
const mongoose = require("mongoose");
const rooms = require("../data/rooms");

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.qhfve.mongodb.net/bookme?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,

      useUnifiedTopology: true,
    }
  )
  .then((con) => console.log("connected to database"));

const seedRooms = async () => {
  try {
    await Room.deleteMany();
    console.log("Rooms are deleted");

    await Room.insertMany(rooms);
    console.log("All rooms has been added");
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedRooms();
