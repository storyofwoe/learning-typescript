// https://learntypescript.dev/09/intro

// conditional types are types that depend on conditional logic
// they are useful for removing a type within a type, for example
type Age = number | null | undefined;
type NonNullableAge = number;

// A better implementation would be:
type NonNullableAge2 = NonNullable<Age>;
