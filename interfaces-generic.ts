// EXERCISE 1
// Simple interface

interface Lead {
    id: number;
    email: string;
    status: "new" | "contacted" | "qualified" | "converted";
    rep?: string,
}

const lead1: Lead = {
    id: 1,
    email: "example@example.com",
    status: "contacted"
}

// const lead2: Lead = { //Error
//     id: 2,
// }

// EXERCISE 2
// Interface as a function parameter

function processLead(lead: Lead): void {
    console.log(lead.rep);
    console.log(lead.email);
}

processLead(lead1);
//Output:
//undefined
//example@example.com

// EXERCISE 3
// Array interfaces

const leads: Lead[] = [
    lead1,
    {
        id: 2,
        email: "r.rose@beacon.edu",
        status: "new"
    },
    {
        id: 3,
        email: "b.belladonna@beacon.edu",
        status: "qualified",
    },
]

function findLead(id: number): Lead | undefined {
    for (let i = 0; i < leads.length; i++) {
        if (id === leads[i].id) {
            return leads[i]
        }
    }
}

console.log(findLead(2));
//{ id: 2, email: 'r.rose@beacon.edu, status: 'new' }

console.log(findLead(5));
//undefined

// EXERCISE 4
// "API" Responses without generics

interface User {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    accountStatus: "active" | "closed"
}

const user1: User = {
    id: 1,
    firstName: "Weiss",
    lastName: "Schnee",
    age: 18,
    accountStatus: "active",
}

// interface LeadResponse {
//     success: boolean;
//     data?: Lead;
//     error?: string;
// }

// interface UserResponse { //notice duplication with LeadResponse
//     success: boolean;
//     data?: User;
//     error?: string;
// }

// EXERCISE 5
// Refactor to a generic

interface ApiResponse<T> { //can unify into a single interface
    success: boolean;
    data?: T;
    error?: string;
}

const leadRes: ApiResponse<Lead> = {
    success: true,
    data: lead1
}

const userRes: ApiResponse<User> = {
    success: true,
    data: user1
}

// EXERCISE 6
// Generic function

function WrapResponse<T>(data: T): ApiResponse<T> {
    return { success: true, data }
}

console.log(WrapResponse({
    firstName: "Penny",
    lastName: "Parker",
    age: 23,
    accountStatus: "closed"
}));

console.log(WrapResponse(lead1))

// EXERCISE 7
// Generic repository

interface Movie {
    id: number;
    name: string;
    releaseYear?: string;
    director?: string;
}

class MovieRepository {
    private movies: Movie[] = [];

    save(movie: Movie): void {
        this.movies.push(movie);
    }

    getById(id: number): Movie | undefined {
        return this.movies.find(m => m.id === id);
    }
}

const repo = new MovieRepository();

repo.save({
    id: 1,
    name: "The Grand Budapest Hotel",
    releaseYear: "2014"
});

const movie = repo.getById(1);
console.log(movie);

// now, integrate Users
class UserRepository {
    private users: User[] = [];

    save(user: User): void {
        this.users.push(user);
    }

    getById(id: number): User | undefined {
        return this.users.find(u => u.id === id);
    }
}

//Notice how the code looks exactly the same?

interface Repository<T> {
    save(item: T): void;
    getById(id: number): T | undefined;
}

class LeadRepository implements Repository<Lead> {
    private leads: Lead[] = [];

    save(lead: Lead): void {
        this.leads.push(lead)
    }

    getById(id: number): Lead | undefined {
        return this.leads.find(l => l.id === id);
    }
}

const lRepo = new LeadRepository();
// lRepo.save(lead1)
// console.log(lRepo.getById(1));

interface RepositoryInterface<T> {
    save(item: T): void;
    getAll(): T[]
}

//still, can make class generic:
class RepositoryClass<T> implements RepositoryInterface<T> {
    private items: T[] = [];

    save(item: T): void {
        this.items.push(item);
    }

    getAll(): T[] {
        return this.items
    }
}

const lRepo2 = new RepositoryClass<Lead>();
lRepo2.save({
    id: 1,
    email: "test@example.com",
    status: "converted",
})

console.log(lRepo2.getAll());

const userRepo3 = new RepositoryClass<User>();
userRepo3.save({
    id: 10,
    firstName: "Penny",
    lastName: "Parker",
    age: 23,
    accountStatus: "active",
});

console.log(userRepo3.getAll());

//=====================
//How do we get something like getById() that relies on id (which might not exist in a generic type)
//Remember that <T> could literally be a string or number!

interface HasId {
    id: number;
}

interface Desk {
    material: string;
    price: number;
}

class RepositoryClass2<T extends HasId> implements RepositoryInterface<T> {
    private items: T[] = [];

    save(item: T): void {
        this.items.push(item);
    }

    getAll(): T[] {
        return this.items
    };

    getById(id: number): T | undefined {
        return this.items.find(i => i.id === id);
    }
}

const userRepo2 = new RepositoryClass2<User>();
userRepo2.save(user1);
console.log(userRepo2.getAll());
console.log(userRepo2.getById(1));

//const deskRepo = new RepositoryClass2<Desk>(); //Error !