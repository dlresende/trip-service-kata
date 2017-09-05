"use strict";

let assert = require('assert');
let TripService = require('../src/TripService');
let sinon = require('sinon');

describe('TripService', () => {

    it('should throw exception when user is not logged in ', () => {
        let tripService = new TripService();
        let noUser = '';
        sinon.stub(tripService, 'getLoggedUser').returns(null);

        assert.throws(() => tripService.getTripsByUser(noUser), Error);
    });

});
