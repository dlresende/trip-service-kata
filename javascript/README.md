A JavaScript (ES6 / ES2015) port of the Trip Service Kata.

* Requirements: Recent version of node.js (tested on 5.1.0). 
* Install Dependencies: `npm install`
* Run tests with file watching for fast feedback: `npm test -- --watch`
* Coverage `npm run coverage`
    *  Then open `coverage/lcov-report/index.html` 

## Useful links
- [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Mocha](http://mochajs.org/#assertions)
- [Sinon.js](http://sinonjs.org/releases/v3.2.1/stubs/)
- [Nodejs Assert module web docs](https://nodejs.org/api/assert.html#assert_assert_deepequal_actual_expected_message)

## Smells
- variable with large scope
- breaking encapsulation (User#getFriends) & SRP
- session objects (UI/Auth) in Service layer (logic/business)

## Refactorings
- extract and override
- guard conditions 
- dependency injection
