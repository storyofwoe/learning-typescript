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
