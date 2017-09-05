"use strict";

let assert = require('assert');
let TripService = require('../src/TripService');
let sinon = require('sinon');

describe('TripService', () => {

    const noFrieds = [];
    const noUser = null,
        alice = {},
        bob = {};
    let aUser = { getFriends: () => { return noFrieds } };
    const noTrips = [],
        FRANCE = {},
        BRAZIL = {};

    let tripService;
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        tripService = new TripService();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should throw exception when user is not logged in ', () => {
        sandbox.stub(tripService, 'getLoggedUser').returns(noUser);

        assert.throws(() => tripService.getTripsByUser(aUser), Error);
    });

    it('should return no trips when user has no friends', ()  => {
        sandbox.stub(tripService, 'getLoggedUser').returns(aUser);

        let trips = tripService.getTripsByUser(aUser);

        assert.deepEqual(trips, noTrips);
    });

    it('should return no trips when logged in user is not friend with user', () => {
        sandbox.stub(tripService, 'getLoggedUser').returns(alice);
        sandbox.stub(aUser, 'getFriends').returns([bob]);

        let trips = tripService.getTripsByUser(aUser);

        assert.deepEqual(trips, noTrips);
    });

    it('should return friend\'s trips when logged in user is friend with user', () => {
        sandbox.stub(tripService, 'getLoggedUser').returns(alice);
        sandbox.stub(aUser, 'getFriends').returns([alice, bob]);
        sandbox.stub(tripService, 'findTripsByUser').returns([FRANCE, BRAZIL]);

        let trips = tripService.getTripsByUser(aUser);

        assert.deepEqual(trips, [FRANCE, BRAZIL]);
    });
});
