import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  id: Number,
  name: String,
  startTime: String,
  endTime: String,
});

const daySchema = new mongoose.Schema({
  dayOfWeek: String,
  classes: [classSchema],
});

const tablexpSchema = new mongoose.Schema({
  branch: {
    type: String,
    required: true,
    unique: true,
  },
  timetable: [daySchema],
});

const Texp = mongoose.model('Texp', tablexpSchema);

export default Texp;