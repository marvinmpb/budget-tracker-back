const express = require('express');
const cors = require('cors');
const path = require('path');
// require('dotenv').config();

const server = express();

const whitelist = ['http://localhost:3000', 'https://budget-tracker-application.netlify.app']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
server.use(cors(corsOptions));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(express.static(path.join(__dirname, '../static')));
server.use(require('./versions/versions'));

module.exports = { server };
