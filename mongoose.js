const mongoose = require('mongoose');
const config = require('./config.json')
const logger = require('./src/utils/logger')

module.exports = {
    init: () => {
        const dbOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false,
            poolSize: 5,
            connectTimeoutMS: 10000,
            family:4
        };
        mongoose.connect(config.mongodbURL, dbOptions);
        mongoose.set('useFindAndModify', false);
        
        mongoose.Promise = global.Promise;
        mongoose.connection.on('connected', () => {
            logger.debug('Mongoose has successfully connected!');
        });

        mongoose.connection.on('err', err => {
            logger.error(`Mongoose connection error: \n${err.stack}`);
        });

        mongoose.connection.on('disconnected', () => {
            logget.warn('Mongoose connection lost');
        });
    }
}
