const mongoose = require('mongoose');
const { Schema } = mongoose;

const roomSchema = new Schema({
    name:{

    },
    type: {

    },
    home:{
        type: Schema.Types.ObjectId,
        ref: 'Home',
        required: true
    },
    devices:[{
        type: Schema.Types.ObjectId,
        ref: 'Device',
    }]
})
const Room = mongoose.model('Room', roomSchema);
module.exports = Room;