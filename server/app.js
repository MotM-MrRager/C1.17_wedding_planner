import express from 'express';
import mongoose from 'mongoose';
import bluebird from 'bluebird';

mongoose.Promise = bluebird;

let app = express();

mongoose.connect('localhost:27017/wedding-planner');

app.use(express.static('public'));
require('./routes').default(app);

app.listen(3000, function() {
  console.log('listening on port 3000')
});
