"use strict";

let UserSession = require('./UserSession');
let TripDAO = require('./TripDAO');

const noFriends = [];

class TripService {
    getTripsByUser(user, loggedUser) {
        if (loggedUser == null) {
            throw new Error('User not logged in.');
        }

        if (user.isFriendWith(loggedUser)) {
            return this.findTripsByUser(user);
        }

        return noFriends;
    }

    findTripsByUser(user) {
        return TripDAO.findTripsByUser(user);
    }
}

module.exports = TripService
