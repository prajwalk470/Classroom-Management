import express from 'express';
import Tablexp from '../models/timetable.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    console.log('Incoming Request Body:', req.body);

    // Assuming req.body is an array of objects, each representing a day
    const schedules = req.body.map((daySchedule) => ({
      [daySchedule.dayOfWeek]: daySchedule.classes.map((classItem) => ({
        id: classItem.id,
        name: classItem.name,
        startTime: classItem.startTime,
        endTime: classItem.endTime,
      })),
    }));

    console.log('Data after processing:', schedules);

    // Create a new instance of the Tablexp model with the processed data
    const newSchedule = new Tablexp(Object.assign({}, ...schedules));

    // Save the schedule to the database
    const savedSchedule = await newSchedule.save();
    console.log('Saved Schedule:', savedSchedule);

    res.status(201).json(savedSchedule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const classes = await Tablexp.find({});
    return res.status(200).json({
      count: classes.length,
      data: classes,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
