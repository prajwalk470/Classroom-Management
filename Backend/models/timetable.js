import mongoose from "mongoose";

const timetableSchema = new mongoose.Schema({
  Monday: [
    {
      id: Number,
      name: String,
      startTime: String,
      endTime: String,
    },
  ],
  Tuesday: [
    {
      id: Number,
      name: String,
      startTime: String,
      endTime: String,
    },
  ],
  Wednesday: [
    {
      id: Number,
      name: String,
      startTime: String,
      endTime: String,
    },
  ],
  Thursday: [
    {
      id: Number,
      name: String,
      startTime: String,
      endTime: String,
    },
  ],
  Friday: [
    {
      id: Number,
      name: String,
      startTime: String,
      endTime: String,
    },
  ],
});

const Table = mongoose.model('Timetable', timetableSchema);

export default Table;
