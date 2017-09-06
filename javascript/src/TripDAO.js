"use strict";

module.exports = class TripDAO {

    static findTripsByUser(user) {
        throw new Error("TripDAO should not be invoked on an unit test.");
    }

    by(user) {
        this.findTripsByUser(user);
    }
}
