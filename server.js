const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/API/user-routes');
// other route imports...

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.set('useCreateIndex', true);
mongoose.set('debug', true);

app.use('/api/users', userRoutes);
// other route uses...

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});