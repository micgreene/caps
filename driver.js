'use strict';

//internal modules
const events = require('./events.js');
const eventMessage = require('./event-message.js');

require('dotenv').config();

//call each event emitter explicitly
events.on('pickup', pickedUp);


function pickedUp(payload){
  //waits a second to simulate driver arrivig at store, then picks up package
	setTimeout(() => {
    //set the package event status to 'in-transit'    
    setIntransit(payload);
    //wait three seconds to simulate delivery time, then attempts to deliver the package
    setTimeout(()=>{
      //set the package event status to 'delivered'
      setDelivered(payload);
    }, 3000);
  }, 1000);  
}

function setIntransit(orderDetails){
  //update live status message
  console.log(`Driver: "Picked up order #${orderDetails.orderId}"`);

  events.emit('in-transit', orderDetails);

  let eventType = {
    event: 'In-Transit',
    time: new Date()
  }
  
  //update the messaging system for new event
  eventMessage(eventType, orderDetails);
}

function setDelivered(orderDetails){
  //update live status message
  console.log(`Driver: "Order #${orderDetails.orderId}, delivered"`);

  //emit the 'delivered' event
  events.emit('delivered', orderDetails);      
  
  let eventType = {
    event: 'Delivered',
    time: new Date()
  }
  
  //update the messaging system for new event
  eventMessage(eventType, orderDetails);
}
module.exports = { setIntransit, setDelivered };
