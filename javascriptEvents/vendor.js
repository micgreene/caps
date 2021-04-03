'use strict';

//3rd part dependencies
const faker = require('faker');

//internal modules
const events = require('./events.js');
const eventMessage = require('../event-message.js');


require('dotenv').config();

let STORENAME = process.env.STORENAME;

//call each event emitter explicitly
events.on('delivered', deliveryComplete);
events.on('in-transit', delivering);

//causes first order to always start at id: 0
let orderNumTracker = -1;

//outlines properties of object for new order details and assign it a new id
function fakeorder(){  
  orderNumTracker++;
 let newOrder = {
    storeName: STORENAME,
    orderId: orderNumTracker,
    customerName: faker.name.findName(),
    address: faker.fake('{{address.streetAddress}}, {{address.cityName}},{{address.stateAbbr}}, {{address.zipCode}}')
  }
  console.log('******************New Order!******************');
  return newOrder;
}

//creates and returns a new order detail
function createNewOrder(){
  let newOrder = fakeorder();

  return newOrder;
}

function deliveryComplete(payload){
  //update live status message
  console.log(`Vendor: "Order #${payload.orderId} has been successfully delivered. ${STORENAME} thanks you for your patronage!"`);
}

function delivering(payload){  
  //update live status message
  console.log(`Driver: "Order #${payload.orderId}, in transit"`);
}

function setPickup(newOrder){
  
  let eventType = {
    event: 'Pick-Up',
    time: new Date()
  }

  //update the messaging system for new event
  eventMessage(eventType, newOrder);

  //how to call by using emitters
  events.emit('pickup', newOrder);
}

setInterval(()=> {
  //create a new fake order and set the event status type to 'pickup'
  let newOrder = createNewOrder();
  setPickup(newOrder);    
}, 5000);

module.exports = { setPickup }