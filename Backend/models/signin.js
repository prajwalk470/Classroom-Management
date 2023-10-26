import mongoose from "mongoose";

const userDataSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    usn: {
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required: true
    },
    year:{
        type:String,
        required:true
    },
    semester:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
  });
  const userData= mongoose.model('userData', userDataSchema);
export default userData;
