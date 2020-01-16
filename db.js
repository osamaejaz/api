const mongoose = require('mongoose');
const config = require('./config/development.json');

exports.connect = async function() {
    const url = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`;
    const db = await mongoose.connect(
        url,
        {
            useNewUrlParser: true,
            useCreateIndex: true,
            socketTimeoutMS: 3000000,
            keepAlive: true,
            reconnectTries: 30000,
            useUnifiedTopology: true
        },
        err => {
            if (!err) {
                console.log('db connected');
            }
        }
    );
};
