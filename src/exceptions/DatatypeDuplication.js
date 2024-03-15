export default class DatatypeDuplication extends Error {
    constructor(name) {
        super(`datatype ${name} already exists`);
        this.name = '_err_datatype_duplication';
    }
}