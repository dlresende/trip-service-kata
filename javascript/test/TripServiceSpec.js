"use strict";

let assert = require('assert');
let TripService = require('../src/TripService');
let sinon = require('sinon');

describe('TripService', () => {

    const noUser = null;
    const noFrieds = [];
    const aUser = { getFriends: () => { return noFrieds } };

    let tripService;

    beforeEach(() => {
        tripService = new TripService();
    });

    it('should throw exception when user is not logged in ', () => {
        sinon.stub(tripService, 'getLoggedUser').returns(noUser);

        assert.throws(() => tripService.getTripsByUser(aUser), Error);
    });

    it('should return no trips when user has no friends', ()  => {
        sinon.stub(tripService, 'getLoggedUser').returns(aUser);

        let trips = tripService.getTripsByUser(aUser);

        assert.deepEqual(trips, []);
    });

});
