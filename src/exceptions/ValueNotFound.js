export default class ValueNotFound extends Error {
    constructor(type, name) {
        super(`value ${type} of ${name} not found`);
        this.name = `err_${type}_notfound`;
    }
}