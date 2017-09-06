"use strict";

module.exports = class User {
    constructor(friends = []) {
        this.friends = friends;
    }

    isFriendWith(user) {
        return this.friends.includes(user);
    }
}
