// https://learntypescript.dev/06/intro

function firstOrNull<T = string>(array: T[]): T | null { // generic parameters aren't really that useful for functions, because the function can infer based on parameter
    return array.length === 0 ? null : array[0]
};

console.log(firstOrNull<number>([1, 2, 3]));
console.log(firstOrNull(["hello", "world"]));
console.log(firstOrNull([]));

// === generic interfaces

interface Contact {
    name: string;
    email: string;
}

interface Form<T> {
    errors: {
        [K in keyof T]?: string; //take the keys of the type T and make them strings
    };
    values: T;
}

const contactForm: Form<Contact> = {
    values: {
        name: "Bob",
        email: "example@example.com",
    },
    errors: {
        email: "This must be a valid email address",
    },
};

console.log(contactForm);

// ======== generic classes

class List<T> {
    private items: T[] = [];

    add(item: T) {
        this.items.push(item);
    };
};

const numberList = new List<number>();
numberList.add(1);
// numberList.add("2"); // Error !

// =============== Implementing generic parameter defaults

// function firstOrNull<T>(array: T[]): T | null {
//     return array.length === 0 ? null : array[0]
// };

interface Component<T1 = string, T2 = any> {
    name: T1;
    props: T2;
    log: () => void;
};

const button: Component = {
    name: "Button",
    props: {
        text: "Save",
    },
    log: () => console.log("Save button"),
};

console.log(button.props.text);
console.log(button.props.text2); // no error because T2 is any

const first = firstOrNull([1, 2, 3]);
console.log(first);

// ==================== 
// GENERIC PARAMETER CONSTRAINTS

interface Logable {
    log: () => void;
};

function logItems<T extends Logable>(items: T[]): void {
    items.forEach(item => item.log())
};

const heading = {
    name: "Heading",
    props: { text: "Chapter 1" },
    log: () => console.log("Chapter 1 heading"),
};

const button2 = {
    name: "Button",
    props: { text: "Save" },
    log: () => console.log("Save button"),
};

logItems([heading, button2]);

// more complex example
interface Form<T> {
    values: T;
};

function getFieldValue<T, K extends keyof T>(form: Form<T>, fieldName: K) { // K has a constraint that requires it to be a key from T
    return form.values[fieldName]                                           // thus, the error goes away !
};

console.log(getFieldValue(contactForm, "name"));
console.log(getFieldValue(contactForm, "email"));
console.log(getFieldValue(contactForm, "phone")); // Error !

// getFieldValue({values: 3}, "name") // Error !

// =====================
// USING GENERIC REST ELEMENTS WITH TUPLE TYPES

// Rest element type is a type for a collection of tuple elements
type Scores = [string, ...number[]];
// ...number[] is a rest element

type NameAndThings<T extends unknown[]> = [name: string, ...things: T]; // Why is extends necessary?
let bobScores: NameAndThings<number[]>;
bobScores = ["Bob", 4, 5, 1];
