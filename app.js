const express = require('express');

const userRoute = require('./routes/user');

const app = express();

const bodyparser = require('body-parser');
const sequelize = require('./util/database');
var cors = require('cors');

app.use(cors());

app.use(bodyparser.json({ extended: false }));

app.use(userRoute);

sequelize.sync()
.then(result => {app.listen(4000)})
.catch(err => console.log("error in sync:",err));