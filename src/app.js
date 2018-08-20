const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config/config');
const mongoose = require('mongoose');

const express = require('express');
const app = express();

mongoose.Promise = Promise;
mongoose.connect(config.db.development.url, { useNewUrlParser: true }, (err) => {
    if (!err) {
        console.error('mongo db connection succesfull');
    } else {
        console.error('mongo db connection failure: ', err);
        mongoose.connection;
    }
});

app
  .use(morgan('combined'))
  .use(bodyParser.json())
  .use(cors());

require('./routes')(app);

process.on('UnhandledPromiseRejectionWarning:', (err) => {
    console.log(err);
});

app.listen(config.port, () => {
    console.log(`server started on port: ${config.port}`);
});
