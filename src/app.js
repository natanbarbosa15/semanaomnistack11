const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const helmet = require('helmet');
const compression = require('compression');
const routes = require('./routes');
const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet);
app.use(compression);
app.use(routes);
app.use(errors());

module.exports = app;
