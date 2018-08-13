const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const {sequelize} = require('./models');
const config = require('./config/config');

const express = require('express');
const app = express();

app
  .use(morgan('combined'))
  .use(bodyParser.json())
  .use(cors());

require('./routes')(app);

process.on('UnhandledPromiseRejectionWarning:', (err) => {
    console.log(err);
});

// adding to sync()-> {force: true} will force drop all table on sync!!
sequelize.sync()
    .then(() => {
        app.listen(config.port, () => {
            console.log(`server started on port: ${config.port}`);
        });
    });
