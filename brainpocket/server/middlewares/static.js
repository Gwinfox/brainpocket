const express = require('express');
const serverConfig = require('../config/options');

module.exports = express.static(serverConfig.staticPaths.avatars.path);