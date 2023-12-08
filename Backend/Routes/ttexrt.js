import express from 'express';
import Texp from '../models/ttexper.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    console.log('Incoming Request Body:', req.body);

    // Extract the branch and timetable information from the request body
    const { branch, timetable } = req.body;

    // Ensure that the branch is provided
    if (!branch) {
      return res.status(400).json({ error: 'Branch is required' });
    }

    // Create an object to represent the timetable
    const timetableData = {
      branch,
      timetable,
    };

    console.log('Data after processing:', timetableData);

    // Create a new instance of the Tablexp model with the processed data
    const newSchedule = new Texp(timetableData);

    // Save the schedule to the database
    const savedSchedule = await newSchedule.save();
    console.log('Saved Schedule:', savedSchedule);

    if (!savedSchedule) {
      return res.status(500).json({ error: 'Failed to save the schedule to the database' });
    }

    res.status(201).json(savedSchedule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const classes = await Texp.find({});
    return res.status(200).json({
      count: classes.length,
      data: classes,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get('/:branch', async (req, res) => {
  try {
    const { branch } = req.params;
    const classes = await Texp.findOne({ branch });

    if (!classes) {
      return res.status(404).json({ message: 'Timetable not found for the given branch' });
    }

    return res.status(200).json({
      data: classes,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
