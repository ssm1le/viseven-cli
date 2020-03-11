import { uniqueNamesGenerator, names, colors } from "unique-names-generator";

export default class UserCredentials {
    constructor() {
        this.firstName = uniqueNamesGenerator({
            dictionaries: [names],
            style: 'capital',
            length: 1,
        });
        this.lastName = uniqueNamesGenerator({
            dictionaries: [colors],
            style: 'capital',
            length: 1,
        });
    }
    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
    getEmail() {
        return `${this.firstName}-${this.lastName}@gmail.com`.toLowerCase();
    }
    getPassword() {
        return this.firstName + this.lastName;
    }
}