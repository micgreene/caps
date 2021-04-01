'use strict';

require('./events.js');
require('./driver.js');
require('./vendor.js');
 
const port = process.env.PORT;

//Home route
const io = require('socket.io')(port);

//namespace
const capsNameSpace = io.of('/caps');


