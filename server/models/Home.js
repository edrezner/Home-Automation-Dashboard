const mongoose = require('mongoose');
const { Schema } = mongoose;

const homeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }, 
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