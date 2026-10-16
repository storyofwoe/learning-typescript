// https://learntypescript.dev/07/intro
interface Animal {
    name: string;
    legs?: number;
}

function addLeg(animal: Animal) {
    animal.legs += 1; // Error - object is possibly undefined!
}

// to resolve this type error, we need to narrow the type of legs to number - ie remove undefined from its type

// Using type assertions
// const button = document.querySelector(".go") as HTMLButtonElement; // Element | null
// if (button) {
//     button.disabled = true; // disabled not recognised for Element - need to narrow it to HTMLButtonElement instead
// };

// non-null assertion operator
function duplicate(text: string | null) {
    let fixString = function() {
        if (text === null || text === undefined) {
            text = "";
        };
    };
    fixString();

    return text!.concat(text!); //Errors - add '!' after variable name that we KNOW can't be null | undefined 
}

console.log(duplicate("Hello"));

// typeof type guard
function double(item: string | number) {
    // TODO:
    // return item.concat(item) if item is a string
    // return item + item if item is a number

    if(typeof item === "string") {
        return item.concat(item);
    } else {
        return item * 2;
    }
};

console.log(double("hello"));
console.log(double(1))

// Using an instanceof type guard
// Used to check whether an object belongs to a particular class. Also takes inheritance into account

class Contact {
    constructor(public emailAddress: string) {}
}
class Person extends Contact {
    constructor(public firstName: string, public surname: string, emailAddress: string) {
        super(emailAddress);
    };
};
class Organisation extends Contact {
    constructor(public name: string, emailAddress: string) {
        super(emailAddress);
    };
};

function sayHello(contact: Contact) {
    // TODO - output Hello {firstName} if a person
    // TODO - output Hello {name} if an organisation

    if (contact instanceof Person) {
        console.log(`Hello ${contact.firstName}`);
    } else if (contact instanceof Organisation) {
        console.log(`Hello ${contact.name}`);
    }
}

const bob = new Person("Bob", "Young", "bob.young@example.com");
const redBricks = new Organisation("Red Bricks", "info@redbricks.com");

sayHello(bob);
sayHello(redBricks);

// Using an `in` type guard
// `in` can be used to check whether a property belongs to a particular object
// Similar structure to above, but instead of classes we're using interfaces

interface Person2 {
    firstName: string;
    surname: string
}

interface Organisation2 {
    name: string;
}

type Contact2 = Person2 | Organisation2

function sayHello2(contact: Contact2) {
    // TODO - output Hello {firstName} if a person
    // TODO - output Hello {name} if an organisation
    if ("firstName" in contact) {
        console.log(`Hello ${contact.firstName}`);
    } else {
        console.log(`Hello ${contact.name}`);
    }
}

const ruby: Person2 = {
    firstName: "Ruby",
    surname: "Rose"
}

const valve: Organisation2 = {
    name: "Valve"
}

sayHello2(ruby)
sayHello2(valve)

// Using a user-defined type guard with a type predicate
// A type predicate can be used in a function's return type to indicate the narrowed type of the parameter

function isPerson(contact: Contact2): contact is Person2 {
    return (contact as Person2).firstName !== undefined;
}

function isOrganisation(contact: Contact2): contact is Organisation2 {
    return (contact as Organisation2).name !== undefined;
}

function sayHello3(contact: Contact2) {
    if (isPerson(contact)) {
        console.log(`Hello ${contact.firstName}`);
    } else if (isOrganisation(contact)) {
        console.log(`Hello ${contact.name}`);
    }
}

sayHello3(ruby)
sayHello3(valve)

// User-defined type guard with an assertion signature

function assertIsPerson(contact: Contact2): asserts contact is Person2 {
    if ((contact as Person2).firstName === undefined) {
        throw new Error("Not a person");
    }
}

function sayHello4(contact: Contact2) {
    // TODO - output Hello {firstName} if a person
    // TODO - output Hello {name} if an organisation
    assertIsPerson(contact);
    console.log(`Hello ${contact.firstName}`);
}

// Discriminated union pattern
interface Person3 extends Person2 {
    contactType: "person";
}

interface Organisation3 extends Organisation2 {
    contactType: "organisation";
}

type Contact3 = Person3 | Organisation3;

function sayHello5(contact: Contact3) {
    // TODO - Output "Hello {firstName}" if a person
    // TODO - Output "Hello {name}" if an organisation
    switch (contact.contactType) {
        case "person":
            console.log(`Hello ${contact.firstName}`);
            break;

        case "organisation":
            console.log(`Hello ${contact.name}`);
            break;
    }
}

const yang: Person3 = {
    firstName: "Yang",
    surname: "Xiao Long",
    contactType: "person"
}

const sanrio: Organisation3 = {
    name: "Sanrio",
    contactType: "organisation"
}
