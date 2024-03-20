export default class InvalidValue extends Error {
    constructor(type, name, reason) {
        super(`${type} ${name} is not valid since ${reason}`);
        this.name = `err_${type}_invalid`;
    }
}