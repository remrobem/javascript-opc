'use strict';
(function () {


  // Object Literal
  let person = {
    firstName: 'Rob',
    lastName: 'Martin',
    age: 21,
    isAdult1: function() { return person.age > 18 },
    isAdult2: () => { return person.age > 18 },
    // isAdult3: () => { return this.age > 18 }, // no 
    // isAdult4: () => { return age > 18 } // no
    isAdult7() { return person.age > 18 }, // best way to write method


  }
  display(person.firstName, person.lastName);

  // person.age = 61;

  display(person.age);

  person.isAdult5 = function() { return this.age > 18 };
  person.isAdult6 = function() { return person.age > 18 };

  display('Adult1: ', person.isAdult1());
  display('Adult2: ', person.isAdult2());
  // display('Adult3: ', person.isAdult3());
  // display('Adult4: ', person.isAdult4());
  display('Adult5: ', person.isAdult5());
  display('Adult6: ', person.isAdult6());
  display('Adult7: ', person.isAdult7());

// object literal with shorthand

function registerUser(firstName, lastName) {
  let person = {
    // firstName: firstName,
    // lastName: lastName,
    firstName, // shorthand 
    lastName,
  }
  display('Registered User:', person)
}

const willieRay = new registerUser('Willie','Ray');
display('Willie:', willieRay) // empty object
display('Willie Name:', willieRay.firstName) // undefined


// use in to get object info
display('propertyNames in loop')
for (let propertyName in person) {
  display(propertyName)
}
// of loop does not work - object is not iterable
display('propertyNames of loop')
for (let propertyName1 of person) {
  display(propertyName1)
}

})();