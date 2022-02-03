import Room from "../models/room";
import ErrorHandler from "../utils/errorHandler";

const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();

    res.status(200).json({
      success: true,
      count: rooms.length,
      rooms,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const newRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.status(200).json({
      success: true,
      room,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const getSingleRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.query.id);
    if (!room) {
      /*  return res.status(404).json({
        success: false,
        error: "room not found with this id",
      }); */

      return next(new ErrorHandler("room not found with this id", 404));
    }
    res.status(200).json({
      success: true,
      room,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const updateRoom = async (req, res) => {
  try {
    let room = await Room.findById(req.query.id);
    if (!room) {
      return res.status(400).json({
        success: false,
        error: "room not found with this id",
      });
    }

    room = await Room.findByIdAndUpdate(req.query.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      room,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const deleteRoom = async (req, res) => {
  try {
    let room = await Room.findById(req.query.id);
    if (!room) {
      return res.status(400).json({
        success: false,
        error: "room not found with this id",
      });
    }

    await room.remove();
    res.status(200).json({
      success: true,
      message: "Room removed",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
export { getAllRooms, newRoom, getSingleRoom, updateRoom, deleteRoom };
