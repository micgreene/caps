'use strict';

//when using javascript events
require('./javascriptEvents/events.js');
require('./driver.js');
require('./javascriptEvents/vendor.js');

const port = process.env.PORT1;

// Get our connections built
// This is the "/" (home) route
const io = require('socket.io')(port);

//namespace
const capsNameSpace = io.of('/caps');

// Global Hub (/) -- all connections and all events go to everyone that connects
// On each connection, a callback is run, where we can identify the users' socket
// Identify the events that the server (hub) handles and what it'll do in response


capsNameSpace.on('connection', (socket) => {

  console.log('Welcome, your socket id is:', socket.id);

  socket.on('enter-room', payload => {
    socket.join(`room-${payload}`);

    //Send this event to everyone in the room.
    io.of('/caps').to(`room-${payload}`).emit('connectToRoom', `You are in room-${payload}`);
  });    

  socket.on('create-pickup', (payload) => {
    console.log('The server heard the \'create-pickup\' event.');
    // the client is going to hear this and run some code
    // Technically, you are calling a function on some other app, over the internet!
    capsNameSpace.emit('pickup', payload);
  });

  socket.on('create-in-transit', (payload) => {
    console.log('The server heard the \'create-intransit\' event.');
    // the client is going to hear this and run some code
    // Technically, you are calling a function on some other app, over the internet!
    capsNameSpace.emit('in-transit', payload);
  });

  socket.on('create-delivered', (payload) => {
    console.log('The server heard the \'create-delivered\' event.');
    // the client is going to hear this and run some code
    // Technically, you are calling a function on some other app, over the internet!
    capsNameSpace.emit('delivered', payload);
  });

  io.on('connect_error', (err) => {
    console.log(`connect_error due to ${err.message}`);
  });
})
