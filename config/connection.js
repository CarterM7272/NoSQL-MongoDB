const mongoose = require('mongoose'); // Directly require mongoose.

const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/studentsDB';

// Connection options.
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,     // To use MongoDB's new `createIndex()` method instead of the deprecated `ensureIndex()`
    useFindAndModify: false  // To use MongoDB's `findOneAndUpdate()`
};

// Connect to MongoDB.
mongoose.connect(connectionString, options);

// Get the connection instance.
const db = mongoose.connection;

// Connection successful.
db.on('connected', () => {
    console.log(`Mongoose connected to ${connectionString}`);
});

// Connection throws an error.
db.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`);
});

// Connection is disconnected.
db.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

module.exports = db;  // Export the connection.