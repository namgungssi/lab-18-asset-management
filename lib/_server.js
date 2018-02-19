'use strict';



const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://<dbuser>:<dbpassword>@ds241668.mlab.com:41668/img', {useMongoClient: true});

const app = module.exports = require('express')();

let usePort = process.env.PORT || 3000;



app.use('/api/1.0', require(__dirname + '/../routes/imgUpload-route'));


app.all('*', (req, res, next) => {
  next(404);
});


app.use((err, req, res, next) => {
  res.send(err);
});


module.exports = {
  start: (port, cb) => {
    app.listen(port, cb);
    console.log(`Server is up on PORT ${process.env.PORT}!`);
  },
  stop: (cb) => app.close(cb),
};
