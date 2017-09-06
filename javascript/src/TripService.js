"use strict";

let UserSession = require('./UserSession');
let TripDAO = require('./TripDAO');

const noFriends = [];

class TripService {
    constructor(tripDAO) {
        this.trips = tripDAO;
    }

    getTripsByUser(user, loggedUser) {
        if (loggedUser == null) {
            throw new Error('User not logged in.');
        }

        if (user.isFriendWith(loggedUser)) {
            return this.trips.by(user);
        }

        return noFriends;
    }
}

module.exports = TripService
