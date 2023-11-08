import express from "express";
import Table from '../models/timetable.js';
const router = express.Router();

router.post('/',async(req,res)=>{
   try{
    // const { dayOfWeek, classInfo } = req.body;
    // const newClass = { ...classInfo };
    
    // const updatedTable = await Table.findOneAndUpdate(
    //     { dayOfWeek },
    //     { $push: { [dayOfWeek]: newClass } },
    //     { new: true }
    // );
    //  if(!updatedTable){
    //     const newTable = new Table({ [dayOfWeek]: [newClass] });
    //     await newTable.save();
    //  }   
    //  res.json({ message: 'Class added successfully' });
        // Create a new document based on the posted JSON data
        const newSchedule = new Table(req.body);
        const savedSchedule = await newSchedule.save();
        res.status(201).json(savedSchedule);
   }
   catch(error){
    console.error(error);
    res.status(500).json({ error: 'Server error' });
   }
});

router.put('/:dayOfWeek', async (req, res) => {
    try {
      const { dayOfWeek } = req.params;
  
      // Ensure the dayOfWeek exists in the request body
      if (!req.body) {
        return res.status(400).json({ error: 'Invalid request body' });
      }
  
      // Find the existing schedule for the given dayOfWeek
      const existingSchedule = await Table.findOne({ [dayOfWeek]: { $exists: true } });
  
      if (!existingSchedule) {
        return res.status(404).json({ error: 'Schedule not found' });
      }
  
      // Update the schedule with the new data
      existingSchedule[dayOfWeek] = req.body;
      const updatedSchedule = await existingSchedule.save();
  
      res.json(updatedSchedule);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

router.get('/', async(req, res)=>{
    try{
        const classes= await Table.find({});
        return res.status(200).json({
            count: classes.length,
            data: classes
        });
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});
router.get('/:dayOfWeek', async (req, res) => {
  try {
    const { dayOfWeek } = req.params;
    const schedule = await Table.findOne({ [dayOfWeek]: { $exists: true } });

    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }

    res.json(schedule[dayOfWeek]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});
router.delete('/:id', async(req, res)=>{
    try{
        const {id}= req.params;
        const result= await Table.findByIdAndDelete(id);
        if(!result){
            return res.status(404).json({message:'Table not found'});
        }
        return res.status(200).send({message: 'Table deleted successfully..'})
    }
    catch(error){
        console.log(error);
        res.status(500).send({message:error.message});
    }
});

export default router;
