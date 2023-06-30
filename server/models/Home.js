const mongoose = require('mongoose');
const { Schema } = mongoose;

const homesSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }], 
    rooms: [{
        type: Schema.Types.ObjectId,
        ref: 'Room'
    }],
    devices: [{
        type: Schema.Types.ObjectId,
        ref: 'Device'
    }]
})

const Home = mongoose.model('Home', homeSchema);

module.exports = Home;