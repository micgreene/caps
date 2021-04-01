'use strict';

// brain.js

const port = process.env.PORT || 3501;

// Get our connections built

// This is the "/" (home) route
const io = require('socket.io')(port);


// Global Hub (/) -- all connections and all events go to everyone that connects
// On each connection, a callback is run, where we can identify the users' socket
// Identify the events that the server (hub) handles and what it'll do in response

io.on('connection', (socket) => {

  console.log('Welcome, your socket id is:', socket.id);

  socket.on('create-pickup', (payload) => {
    console.log('The server heard the \'create-pickup\' event.');
    // the client is going to hear this and run some code
    // Technically, you are calling a function on some other app, over the internet!
    io.emit('pickup', payload);
  });

  socket.on('create-pickup', (payload) => {
    console.log('The server heard the \'create-pickup\' event.');
    // the client is going to hear this and run some code
    // Technically, you are calling a function on some other app, over the internet!
    io.emit('pickup', payload);
  });

  socket.on('create-pickup', (payload) => {
    console.log('The server heard the \'create-pickup\' event.');
    // the client is going to hear this and run some code
    // Technically, you are calling a function on some other app, over the internet!
    io.emit('pickup', payload);
  });

  socket.on('create-in-transit', (payload) => {
    console.log('The server heard the \'create-intransit\' event.');
    // the client is going to hear this and run some code
    // Technically, you are calling a function on some other app, over the internet!
    io.emit('in-transit', payload);
  });

  socket.on('create-delivered', (payload) => {
    console.log('The server heard the \'create-delivered\' event.');
    // the client is going to hear this and run some code
    // Technically, you are calling a function on some other app, over the internet!
    io.emit('delivered', payload);
  });

  // socket.on('goodbye', (payload) => {
  //   console.log('The server heard the goodbye event');
  //   io.emit('bye');
  // }); 

})

io.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

