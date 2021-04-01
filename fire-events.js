'use strict';

let io = require('socket.io-client');

let host = 'http://localhost:3000';

let mainConnection = io.connect(host);
let exConnection = io.connect(`${host}/extremities`);

mainConnection.emit('eventname', 90);

exConnection.emit('neweventname', 100);