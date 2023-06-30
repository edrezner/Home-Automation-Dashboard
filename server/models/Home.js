const mongoose = require('mongoose');
const { Schema } = mongoose;

const homesSchema = new Schema({
    name: {

    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }], 
    // Check
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