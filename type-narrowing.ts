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

