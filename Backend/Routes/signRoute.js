import express  from "express";
import Data from "../models/signin.js";
const router = express.Router();
// create a route for User

router.post('/', async (req, res) => {
    try {
        if (!req.body.name || !req.body.usn || !req.body.branch || !req.body.email || !req.body.year || !req.body.semester || !req.body.password){
            return res.status(400).send({
                message: 'Send all fields',
            });
        }

        const newUser = {
            name:  req.body.name ,
            usn :req.body.usn,
            branch : req.body.branch ,
            email :req.body.email,
            year :req.body.year,
            semester :req.body.semester,
            password: req.body.password
        };

        const usr= await Data.create(newUser);
        // Respond with a success message and the created room
        res.status(201).send({
            message: 'User created successfully',
            data: usr
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});

router.get('/', async(req, res)=>{
    try{
        const users= await Data.find({});
        return res.status(200).json({
            count: users.length,
            data: users
        });
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

router.get('/:id', async(req, res)=>{
    try{
        const {id}= req.params;
        const data= await Data.findById(id);
        return res.status(200).json(data);
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
        const result= await Data.findByIdAndDelete(id);
        if(!result){
            return res.status(404).json({message:'User not found'});
        }
        return res.status(200).send({message: 'User deleted successfully..'})
    }
    catch(error){
        console.log(error);
        res.status(500).send({message:error.message});
    }
});

export default router;