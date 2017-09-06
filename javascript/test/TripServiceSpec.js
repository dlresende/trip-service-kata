"use strict";

let assert = require('assert');
let TripService = require('../src/TripService');
let sinon = require('sinon');
let User = require('../src/User');

describe('TripService', () => {

    const noFriends = [];
    const noUser = null,
        loggedInUser = new User(),
        alice = new User(),
        bob = new User();
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
        let aUser = new User();

        assert.throws(() => tripService.getTripsByUser(aUser), Error);
    });

    it('should return no trips when user has no friends', () => {
        sandbox.stub(tripService, 'getLoggedUser').returns(loggedInUser);
        let aUserWithNoFriends = new User();

        let trips = tripService.getTripsByUser(aUserWithNoFriends);

        assert.deepEqual(trips, noTrips);
    });

    it('should return no trips when logged in user is not friend with user', () => {
        sandbox.stub(tripService, 'getLoggedUser').returns(alice);
        let aUserWithFriends = new User([bob]);

        let trips = tripService.getTripsByUser(aUserWithFriends);

        assert.deepEqual(trips, noTrips);
    });

    it('should return friend\'s trips when logged in user is friend with user', () => {
        sandbox.stub(tripService, 'getLoggedUser').returns(alice);
        sandbox.stub(tripService, 'findTripsByUser').returns([FRANCE, BRAZIL]);
        let aUserWithFriends = new User([alice, bob]);

        let trips = tripService.getTripsByUser(aUserWithFriends);

        assert.deepEqual(trips, [FRANCE, BRAZIL]);
    });
});
