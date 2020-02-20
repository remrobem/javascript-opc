'use strict';
(function () {


  // Object Literal
  let person = {
    firstName: 'Rob',
    lastName: 'Martin',
    age: 21,
    isAdult1: function () { return person.age > 18 },
    isAdult2: () => { return person.age > 18 },
    // isAdult3: () => { return this.age > 18 }, // no 
    // isAdult4: () => { return age > 18 } // no
    isAdult7() { return person.age > 18 }, // best way to write method


  }
  display(person.firstName, person.lastName);

  // person.age = 61;

  display(person.age);

  person.isAdult5 = function () { return this.age > 18 };
  person.isAdult6 = function () { return person.age > 18 };

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

  const willieRay = new registerUser('Willie', 'Ray');
  display('Willie:', willieRay) // empty object
  display('Willie Name:', willieRay.firstName) // undefined


  // use in to get object info
  display('propertyNames in loop')
  for (let propertyName in person) {
    display(propertyName)
  }
  // of loop does not work - object is not iterable
  display('propertyNames of loop')
  // for (let propertyName1 of person) {
  //   display(propertyName1)
  // }

  // object assign

  let personA = {
    firstName: 'Rob',
    lastName: 'Martin',
    age: 21,
  }

  let healthStats = {
    height: 70,
    weight: 222,
  }

  function mergeHealthStats(person, stats) {
    return Object.assign({}, person, stats);
    // if {} not used, then person gets mutated
  }

  display('mergeHealthStats');
  display(mergeHealthStats(personA, healthStats));

  // constructor function

  function PersonY(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.isAdult = function () { return this.age > 18 };
  }

  let freddy = new PersonY('Freddy', 'Lynn', 20);
  let kid = new PersonY('Little', 'Kid', 17);
  display('Freddy');
  display(freddy);
  display(freddy.isAdult());
  display('kid');
  display(kid);
  display(kid.isAdult());


  // use value of var to find object property - need to use braket notation
  for (let propertyName in freddy) {
    display(propertyName + ': ' + freddy[propertyName])
  }

  // object properties

  display(Object.getOwnPropertyDescriptor(freddy, 'firstName'))
  Object.defineProperty(freddy, 'firstName', { writable: false })
  display(Object.getOwnPropertyDescriptor(freddy, 'firstName'))

  Object.defineProperty(freddy, 'firstName', { writable: true })


  // get set
  display(Object.getOwnPropertyDescriptor(freddy, 'firstName'));

  Object.defineProperty(freddy, 'fullName', {
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    set: function (value) {
      var nameParts = value.split(' ');
      display('nameParts: ' + JSON.stringify(nameParts))
      this.firstName = nameParts[0];
      this.lastName = nameParts[1];
    }
  });

  display('Full Name: ' + freddy.fullName);
  display('freddy: ' + JSON.stringify(freddy))
  freddy.fullName = 'Willie Mays';
  display('New Full Name: ' + freddy.fullName);
  // *************************************
  // PROTOTYPES
  display('PROTOTYPES')

  // *************************************

  let testFunc1 = function () { };

  display(testFunc1.prototype) // empty object named testFunc1

  let testObj = { name: 'Willie' }
  display(testObj.prototype) // undefined
  display(testObj.__proto__) // empty object, no name, just Object

  // FUNCTION prototype is the object instance that will become the prototype 
  // for all objects created using this function as a constructor

  // OBJECT prototype is the object instance from which the object is inherited

  function Person2(fName, lName) {
    this.fName = fName;
    this.lName = lName;
    this.height = 72;
  }
  display('Person2: ' + Person2) // function name and details - looks just like definition
  display('Person2 prototype Before age added ' + JSON.stringify(Person2.prototype)); // empty
  Person2.prototype.age = 25;
  display('After age added prototype: ' + JSON.stringify(Person2.prototype)); // contains age, empty id age not added
  display('After age added __proto__.age: ' + Person2.__proto__.age); // undefined
  display('After age added __proto__: ' + Person2.__proto__); // function() {[native code]}

  // __proto__ is shared by all - any change affects all - change willie age also change roberto and nolan
  // prototype exists for the parent, children have __proto__ that points to same instance as parent prototype
  let willie = new Person2('Willie', 'Mays');
  display('Willie  prototype: ' + JSON.stringify(willie.prototype)); // undefined
  display('Willie  __proto__: ' + willie.__proto__.age); //  25

  // this changes age for everyone because __proto__ points (references) Person2 prototype
  willie.__proto__.age = 30;
  // willie.prototype.age = 45; // not valid 

  let roberto = new Person2('Roberto', 'Clemente');
  display('Roberto  prototype: ' + JSON.stringify(roberto.prototype)); // undefined
  display('Roberto  __proto__: ' + roberto.__proto__.age); //  30

  let nolan = new Person2('Nolan', 'Ryan');
  display('Nolan  prototype: ' + JSON.stringify(nolan.prototype)); // undefined
  display('Nolan  __proto__: ' + nolan.__proto__.age); //  30

  display('prototype and __proto__ are same for function and an instance: ')
  display(Person2.prototype === nolan.__proto__) // true

  roberto.age = 35;
  display('Roberto  prototype after roberto.age change : ' + JSON.stringify(roberto.prototype)); // undefined
  display('Roberto  __proto__ after roberto.age change: ' + roberto.__proto__.age); //  30
  display('Roberto  age after roberto.age change: ' + roberto.age); //  35
  display('Roberto  after roberto.age change: ' + JSON.stringify(roberto)); //  fname, lname, height, age = 35
  display('Willie  after roberto.age change: ' + JSON.stringify(willie)); //  fname, lname, height, NO AGE
  // only roberto age changed
  display('Nolan  prototype after roberto.age change : ' + JSON.stringify(nolan.prototype)); // undefined
  display('Nolan  __proto__ after roberto.age change: ' + nolan.__proto__.age); //  30
  display('Nolan  age after roberto.age change: ' + nolan.age); //  30

})();