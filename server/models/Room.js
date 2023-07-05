const mongoose = require('mongoose');
const { Schema } = mongoose;

const roomSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true
    },
    home:{
        type: Schema.Types.ObjectId,
        ref: 'Home',
        required: false
    },
    devices:[{
        type: Schema.Types.ObjectId,
        ref: 'Device',
    }]
})
const Room = mongoose.model('Room', roomSchema);

module.exports = Room;