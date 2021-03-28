'use strict';

//3rd party dependencies
const { it } = require('@jest/globals');
const supertest = require('supertest');

//local modules to be tested
const vendorEvents = require('../vendor.js');

//spy on console for logs
const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

//creates test parameters
describe('VENDOR EVENT HANDLERS', ()=>{
  //create mock order details to use for all tests
  let newOrder = {
    storeName: 'Frank\'s Flowers',
    orderId: 0,
    customerName: 'customer name',
    address: 'address'
  };

  //case #1 - Set Pick-Up Status
  it('should console.log a confirmation message when an order has been marked as ready for pickup ', ()=>{
    vendorEvents.setPickup(newOrder);

    expect(consoleSpy).toBeCalledWith(`--------------------------------------------------------------------,
    Event: Pick-Up,
      Time: ${new Date()},
      Order Details - 
      Storename: Frank's Flowers,
      id#: 0,
      Customer: customer name,
      Address: address,
--------------------------------------------------------------------`
    );
    
    consoleSpy.mockReset();
  })
});
