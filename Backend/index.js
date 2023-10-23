import express from "express";
import mongoose from "mongoose";
import {PORT, mongoDBURL} from "./config.js";
// import Room from './models/room.js'
import roomRoute from './Routes/roomRoute.js'
const app= express();
// middleware to parse the json data request body
app.use(express.json());
// middleware to cors policy
// app.use(cors());

app.get('/',(req,res)=>{
    // console.log(req);
    return res.status(200).send('Welcome to express server..')
});

app.use('/rooms', roomRoute);

mongoose.connect(mongoDBURL)
.then(()=>{
    console.log('app connected to mongodb..');
    app.listen(PORT, ()=>{
        console.log(`App is listening to port : ${PORT}`);
    });
}).catch((error)=>{
    console.log(error);
})