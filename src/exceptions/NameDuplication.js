export default class NameDuplication extends Error {
    constructor(type, name) {
        super(`${type} ${name} already exists`);
        this.name = `err_${type}_duplication`;
    }
}