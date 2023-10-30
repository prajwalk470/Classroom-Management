import express from "express";
import mongoose from "mongoose";
import {PORT, mongoDBURL} from "./config.js";
// import Room from './models/room.js';
import userData from "./models/signin.js";
import cors from "cors";
import roomRoute from './Routes/roomRoute.js'
import signRoute from './Routes/signRoute.js';
// import loginRoute from './Routes/loginRoute.js';

const app= express();

// middleware to parse the json data request body
app.use(express.json());
// middleware to cors policy
app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
    // You can also use '*' to allow any origin, but this is less secure.
    // res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
app.get('/',(req,res)=>{
    // console.log(req);
    return res.status(200).send('Welcome to express server..')
});

app.use('/rooms', roomRoute);
app.use('/register', signRoute);
// app.use('/login', loginRoute);
app.post('/login', (req,res)=>{
    const {usn, password}= req.body;
    userData.findOne({usn:usn})
    .then(user =>{
        if(user){
            if(user.password === password){
                res.json("Success");
            }
            else{
                res.json("Password mismatch");
            }
        }
        else{
            res.json("No user found");
        }
    });
});


mongoose.connect(mongoDBURL)
.then(()=>{
    console.log('app connected to mongodb..');
    app.listen(PORT, ()=>{
        console.log(`App is listening to port : ${PORT}`);
    });
}).catch((error)=>{
    console.log(error);
})