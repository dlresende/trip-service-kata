"use strict";

let UserSession = require('./UserSession');
let TripDAO = require('./TripDAO');

const noFriends = [];

class TripService {
    getTripsByUser(user) {
        let loggedUser = this.getLoggedUser();

        if (loggedUser == null) {
            throw new Error('User not logged in.');
        } else {
            if (user.isFriendWith(loggedUser)) {
                return this.findTripsByUser(user);
            }
            return noFriends;
        }
    }


    findTripsByUser() {
        return TripDAO.findTripsByUser(user);
    }

    getLoggedUser() {
        return UserSession.getLoggedUser();
    }

}

module.exports = TripService
