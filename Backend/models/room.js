import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    roomnumber: {
        type:String,
        required: true
    },
    block: {
        type:String,
        required:true
    },
    floor:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required: true
    },
    year_sem:{
        type:String,
        required:true
    }
  });
  
//   const Room = mongoose.model('Room', roomSchema);

// const roomSchema= mongoose.Schema({
//     roomnumber: {
//         type:String,
//         required: true
//     },
//     block: {
//         type:String,
//         required:true
//     },
//     floor:{
//         type:String,
//         required:true
//     },
//     branch:{
//         type:String,
//         required: true
//     }

// });

const Room= mongoose.model('Room', roomSchema);
export default Room;