"use strict";

let assert = require('assert');
let TripService = require('../src/TripService');
let sinon = require('sinon');

describe('TripService', () => {

    const noUser = null,
        alice = {},
        bob = {};
    const noFrieds = [];
    const FRANCE = {},
        BRAZIL = {};
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

    it('should return friend\'s trips when logged in user is friend with user', () => {
        sinon.stub(aUser, 'getFriends').returns([alice, bob]);
        sinon.stub(tripService, 'getLoggedUser').returns(alice);
        sinon.stub(tripService, 'findTripsByUser').returns([FRANCE, BRAZIL]);

        let trips = tripService.getTripsByUser(aUser);

        assert.deepEqual(trips, [FRANCE, BRAZIL]);
    });
});
