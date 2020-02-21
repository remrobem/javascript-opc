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

  display('willie has age property: ' + willie.hasOwnProperty('age')) // false
  display('roberto has age property: ' + roberto.hasOwnProperty('age')) // true
  display('nolan has age property: ' + nolan.hasOwnProperty('age')) // false

  // this createa new instance of Person2 protoytype, does not change the original
  // the Person2 now has a new prototype of { age: 44 } for new instances
  // so any exiting instance do not change, but new instances will use the new prptotype instance
  Person2.prototype = { age: 44 };
  display('willie age after Person2.prototype = {age:44}: ' + willie.age); //  30
  display('roberto age after Person2.prototype = {age:44}: ' + roberto.age); //  35
  display('nolan age after Person2.prototype = {age:44}: ' + nolan.age); //  30

  let steve = new Person2('Steve', 'Carlton');

  display('steve age create new Person2}: ' + steve.age); //  44


  // *************************************************
  // Prototype Inheritance
  // *************************************************

  // how much used??

  function PersonS(fName, lName, age) {
    this.fName = fName;
    this.lName = lName;
    this.age = age;
    this.tfunc = function () { return 'got the funk' }
    Object.defineProperty(this, 'fullName', {
      get: function () {
        return this.fName + ' ' + this.lName;
      },
      enumerable: true
    });
  }

  // adding PersonS.call add the Student properties to Student
  // calls Person function, setting the context of this
  function Student(fName, lName, age) {

    PersonS.call(this, fName, lName, age);
    this.enrolledCourses = [];

    this.enroll = function (courseId) {
      this.enrolledCourses.push(courseId)
    }

    this.getCourses = function () {
      return this.fullName + ' is enrolled in the following courses: ' +
        this.enrolledCourses.join(', ');
    }

  }
  display('Before Student.prototype create PersonS.prototype changes: ')
  display(Student.prototype.constructor) // function Student details

  Student.prototype = Object.create(PersonS.prototype);
  display('After Student.prototype create PersonS.prototype changes: ')
  display(Student.prototype.constructor) // function PersonS details

  Student.prototype.constructor = Student;
  display('After Student.prototype.constructor changes:  ')
  display(Student.prototype.constructor) // function Student details

  let daffy = new Student('Daffy', 'Duck', 124);

  display('daffy: ')
  display('new student daffy: ' + JSON.stringify(daffy)); // {"enrolledCourses": []}
  display(daffy) // Student details
  display(daffy.fullName); // Daffy Duck
  display(daffy.tfunc()); // got the funk

  daffy.enroll('DCK101');
  daffy.enroll('QUA200');
  daffy.enroll('ACT150');
  display(daffy.getCourses()) // courses listed

  display(daffy.__proto__) // Student
  display(daffy.__proto__.__proto__) // PersonS
  display(daffy.__proto__.__proto__.__proto__) // Oject
  display(daffy.__proto__.__proto__.__proto__.__proto__) // null

  // ************************************************
  // CLASSES
  // ************************************************
  display('***** Classes ************************')
  display('***** Classes ************************')
  display('***** Classes ************************')
  // replace all the function stuff above

  class PersonT {
    // constructor properties exist on instance
    constructor(fName, lName, age) {
      this.fName = fName;
      this.lName = lName;
      this.age = age;
    }
    // static property
    static adultAge = 18;

    isAdult() {
      return this.age > 18;
    }

    // setter and getter exist only in protype
    // getter
    get fullName() {
      return this.fName + ' ' + this.lName;
    }
    // setter
    set fullName(fullName) {
      const nameParts = fullName.split(' ');
      this.fName = nameParts[0];
      this.lName = nameParts[1];
    }

  }

  let syd = new PersonT('Syd', 'Finch', 23);
  display('syd: ');
  display(syd);
  display(syd.fullName);
  syd.fullName = 'Sydney Finch,Jr.';
  display(syd.fullName) // 'Sydney Finch,Jr.'
  display(syd.isAdult()); // true

  display(syd) // PersonT details except no isAdult or fullName, no get/set

  display(syd.prototype) // undefined
  display(syd.__proto__) // PersonT {}  empty
  display(PersonT.prototype) // PersonT {}   empty
  display(PersonT.__proto__) // function() {[native code]}

  Object.defineProperty(PersonT.prototype, 'fullName', { enumerable: true });
  display(syd) // PersonT details including fullName, no isAdult
  Object.defineProperty(PersonT.prototype, 'isAdult', { enumerable: true });
  display(syd) // PersonT details including fullName and isAdult

  let cal = new PersonT('Cal', 'Ripken', 28);
  display(cal) // PersonT details including fullName and isAdult

  // IHERITANCE


  class StudentT extends PersonT {
    constructor(fName, lName, age) {
      // super calls constructor of class being extended
      super(fName, lName, age);
      this.enrolledCourses = [];
    }

    // static can be executed without having an instance
    static fromPerson(person) {
      return new Student(person.fName, person.lName, person.age)
    }

    enroll(courseId) {
      this.enrolledCourses.push(courseId)
    }

    getCourses() {
      return this.fullName + ' is enrolled in the following courses: ' +
        this.enrolledCourses.join(', ');
    }
  }

  let brooks = new StudentT('Brooks', 'Robinson', 26);

  display('brooks');
  display(brooks); // everything about Brooks - PersonT and StudentT
  brooks.enroll('BAS500');
  brooks.enroll('3RD999')
  display(brooks.getCourses()); // shows courses

  // executing static method
  let brooksStudent = StudentT.fromPerson(brooks);
  display('brooksStudent');
  display(brooksStudent); // displays everthing

  // *************************************
  // REGEX
  // *************************************
  display('**** Regex *********************************');


  let regex = /[a-z]/g;
  // test returns boolean
  display(regex.test('3aZ'));

  
  function findAlerts(logData) {

    // this uses regex groups which will create multi entries in results table - 
    // without groups, only 1 entry in results
    const regex = /ERROR(.*?):(.*?);/g;
    let result = regex.exec(logData);

    while (result != null) {
      display(result[0]);
      display(result[1]);
      display(result[2]);
      // console.log(result)
      display('***********---------------------------------------');
      result = regex.exec(logData);
    }
  }

  let logData = 'Hb:ERROR(a):FailedValidation;3278:3248,ERROR(b):fsdhjk;';
  let results = findAlerts(logData)
  // display(results)
  // console.log(results)
})();