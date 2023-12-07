import express  from "express";
import Room from '../models/room.js'
const router = express.Router();
// create a route for room

router.post('/', async (req, res) => {
    try {
        if (!req.body.roomnumber || !req.body.branch || !req.body.floor || !req.body.block ||!req.body.year_sem){
            return res.status(400).send({
                message: 'Send all fields',
            });
        }

        const newRoom = {
            roomnumber: req.body.roomnumber,
            branch: req.body.branch,
            floor: req.body.floor,
            block:req.body.block,
            year_sem: req.body.year_sem
        };

        const room = await Room.create(newRoom);
        // Respond with a success message and the created room
        res.status(201).send({
            message: 'Room created successfully',
            room: room
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});
// getting all rooms
router.get('/', async(req, res)=>{
    try{
        const rooms= await Room.find({});
        return res.status(200).json({
            count: rooms.length,
            data: rooms
        });
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});
// getting rooms by id
router.get('/:id', async(req, res)=>{
    try{
        const {id}= req.params;
        const room= await Room.findById(id);
        return res.status(200).json(room);
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});
router.put('/:id', async(req, res)=>{
    try{
        if (!req.body.roomnumber || !req.body.block || !req.body.floor || !req.body.branch ||!req.body.year_sem){
            return res.status(400).send({
                message: 'Send all fields',
            });
        }
        const {id}= req.params;
        const result= await Room.findByIdAndUpdate(id,req.body);
        if(!result){
            return res.status(404).send({messgae:'Room not found'})
        }
        return res.status(400).send({message:'Room updated successfully'})
    }
        catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

// route for deleting a book by id
router.delete('/:id', async(req,res)=>{
    try{
        const {id}= req.params;
        const result= await Room.findByIdAndDelete(id);
        if(!result){
            return res.status(404).json({message:'Room not found'});
        }
        return res.status(200).send({message: 'Room deleted successfully..'})
    }
    catch(error){
        console.log(error);
        res.status(500).send({message:error.message});
    }
});

export default router;