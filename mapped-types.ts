// https://learntypescript.dev/08/intro

type Person = {
    name: string;
    dob: Date;
}

type PersonUpdate = {
    name?: string;
    dob?: Date;
}

function updatePerson(person: Person, update: PersonUpdate) {
    return {...person, ...update}
}

// But, if we update Person, we need to remember to update PersonUpdate -- what if it was derived from Person?

type ContactDetails = { name: string, email: string };
let keys: keyof ContactDetails; // keys: "name" | "email"

// Creating a mapped type
interface Form<T> {
    values: T,
    errors: { [K in keyof T]?: string };
}

const contactForm: Form<{ name: string; email: string; mobile: string; }> = {
    values: {
        name: "Ruby",
        email: "r.rose@beacon.edu",
        mobile: "07123 456789"
    },
    errors: {
        email: "Invalid email address",
        mobile: "You must add a mobile number",
    },
};
console.log(contactForm);
