export default class DatatypeNotFound extends Error {
    constructor(name) {
        super(`datatype ${name} not found`);
        this.name = '_err_datatype_not_found';
    }
}