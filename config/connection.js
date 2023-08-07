const mongoose = require('mongoose'); // Directly require mongoose.

const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/studentsDB';


const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(connectionString, options);

const db = mongoose.connection;


db.on('connected', () => {
    console.log(`Mongoose connected to ${connectionString}`);
});


db.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`);
});


db.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

module.exports = db; 