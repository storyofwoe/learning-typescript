// https://learntypescript.dev/09/intro

// conditional types are types that depend on conditional logic
// they are useful for removing a type within a type, for example
type Age = number | null | undefined;
type NonNullableAge = number;

// A better implementation would be:
type NonNullableAge2 = NonNullable<Age>;

// Creating a basic conditional type 
type Person = {
    name: string;
    age: number;
};
type Example1 = Person extends {} ? string : number;

type NullableString = string | null;

type RemoveNull<T> = T extends null ? never: T;

let firstName: RemoveNull<NullableString>;
firstName = null; // Now returns an error because we removed null
firstName = "bob";

// Inferring types in a conditional type
type ArrayElementType<T> = T extends (infer E)[] ? E : T;

type item1 = ArrayElementType<number[]>;
// number[] extends (infer E)[]
// therefore, return E = number

type item2 = ArrayElementType<{ name: string }>;
// TypeScript cannot infer E in the form "{name: string} extends (infer E)[]"
// Therefore, return T = {name: string}

// An example
function addPerson(personName: string) {
    return {
        type: "AddPerson",
        payload: personName
    };
}

function removePerson(id: number) {
    return {
        type: "RemovePerson",
        payload: id
    };
}

type AddPersonType = typeof addPerson;
type RemovePersonType = typeof removePerson;
