const express = require('express');
const mongoose = require('mongoose'); // If you're using mongoose in this file, you need to require it.
const db = require('./config/connection'); // Assuming this returns a mongoose connection.

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

mongoose.set('debug', true); // This sets mongoose to run in debug mode.

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));