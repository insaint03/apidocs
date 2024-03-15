export default class DatatypeNotValid extends Error {
    constructor(name, reason) {
        super(`datatype ${name} not valid since ${reason}`);
        this.name = '_err_datatype_not_valid';
    }
}