"use strict";

let assert = require('assert');
let TripService = require('../src/TripService');
let sinon = require('sinon');
let User = require('../src/User');
let TripDAO = require('../src/TripDAO');

describe('TripService', () => {

    const noFriends = [];
    const userNotLoggedIn = null,
        loggedInUser = new User(),
        alice = new User(),
        bob = new User();
    const noTrips = [],
        FRANCE = {},
        BRAZIL = {};

    let tripService;
    let trips;
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        trips = new TripDAO();
        tripService = new TripService(trips);
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should throw exception when user is not logged in ', () => {
        let friend = new User();

        assert.throws(() => tripService.getTripsByUser(friend, userNotLoggedIn), Error);
    });

    it('should return no trips when user has no friends', () => {
        let notAFriend = new User();

        let trips = tripService.getTripsByUser(notAFriend, loggedInUser);

        assert.deepEqual(trips, noTrips);
    });

    it('should return no trips when logged in user is not friend with user', () => {
        let friend = new User([bob]);

        let trips = tripService.getTripsByUser(friend, loggedInUser);

        assert.deepEqual(trips, noTrips);
    });

    it('should return friend\'s trips when logged in user is friend with user', () => {
        let friend = new User([alice, bob, loggedInUser]);
        sandbox.stub(trips, 'by').withArgs(friend).returns([FRANCE, BRAZIL]);

        let friendTrips = tripService.getTripsByUser(friend, loggedInUser);

        assert.deepEqual(friendTrips, [FRANCE, BRAZIL]);
    });
});
