'use strict';

//when using javascript events
// require('./javascriptEvents/events.js');
// require('./javascriptEvents/driver.js');
// require('./javascriptEvents/vendor.js');

//.env variables
require('dotenv').config();
const port = process.env.PORT;

// Get our connections built
// This is the "/" (home) route
const io = require('socket.io')(port);

//namespace
const capsNameSpace = io.of('/caps');

//run these upon any client connecting to host
capsNameSpace.on('connection', (socket) => {

  console.log('Welcome, your socket id is:', socket.id);

  //whenever a vendor successfully joins a new room, welcome them in and give them the room name in the console
  socket.on('enter-room', payload => {
    socket.join(`room-${payload}`);

    //Send this event to everyone in the room.
    io.of('/caps').to(`room-${payload}`).emit('connectToRoom', `You are in room-${payload}`);
  });    

  //pick-up is emitted to everyone in the namespace
  socket.on('create-pickup', (payload) => {
    console.log('The server heard the \'create-pickup\' event.');
    // all clients are going to hear this, any driver can respond to this
    capsNameSpace.emit('pickup', payload);
  });

  //in-transit is only emitted to vendors in the same room as the Storename of the pickup
  socket.on('create-in-transit', (payload) => {
    console.log('The server heard the \'create-intransit\' event.');
    // the client in the proper room is going to hear this and run some code
    io.of('/caps').to(`room-${payload.storeName}`).emit('in-transit', payload);
  });

  //delivered is only emitted to vendors in the same room as the Storename of the pickup
  socket.on('create-delivered', (payload) => {
    console.log('The server heard the \'create-delivered\' event.');
    // the client in the proper room is going to hear this and run some code
    io.of('/caps').to(`room-${payload.storeName}`).emit('delivered', payload);
  });

  //if there is a connection problem return an error message explaining why
  io.on('connect_error', (err) => {
    console.log(`connect_error due to ${err.message}`);
  });
})
