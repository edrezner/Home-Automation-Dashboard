const mongoose = require('mongoose');
const { Schema } = mongoose;

const deviceSchema = new Schema({ 
    name : {

    },
    type: {

    },
    settings:{

    }
})

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;