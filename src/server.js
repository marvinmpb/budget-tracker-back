const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const server = express();

server.use(cors({ origin: 'https://627d542842f2ce1050d93e8f--thunderous-concha-01ff2a.netlify.app' }));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(express.static(path.join(__dirname, '../static')));
server.use(require('./versions/versions'));

module.exports = { server };
