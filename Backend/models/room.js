import mongoose from "mongoose";

const roomSchema= mongoose.Schema({
    roomnumber: {
        type:Number,
        required: true
    },
    branch:{
        type:String,
        required: true
    }
});

const Room= mongoose.model('Room', roomSchema);
export default Room;