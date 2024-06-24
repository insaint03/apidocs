// common basis for property description
export default class Descriptable {
    constructor({desc, description}) {
        this.description = desc || description || '';
    }

    get summary() {
        return this._summary || '';
    }

    set summary(value) {
        this._summary = value;
    }

    get desc() {
        return this._desc || '';
    }

    get description() {
        return [this._summary, this._desc].join('\n').trim();
    }

    set description(value) {
        const lines = (value || '').split('\n');
            // .map((t)=>t.trim())
            // .filter((t)=>t && t.length>0);

        this._summary = lines.shift();
        this._desc = lines.join('\n');
    }
}