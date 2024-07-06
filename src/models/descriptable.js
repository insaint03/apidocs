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
        return (this._desc || '').trim();
    }

    get description() {
        return [this._summary, this._desc].join('\n').trim();
    }

    set description(value) {
        // const lines = (value || '').split('\n');
            // .map((t)=>t.trim())
            // .filter((t)=>t && t.length>0);

        this._summary = Descriptable.get_summary(value);
        this._desc = Descriptable.get_desc(value);
    }

    get serialized() {
        return {
            description: this.description,
        }
    }

    static get_summary(text) {
        return (text || '').split('\n')
            .shift();
            // .map((t)=>t.trim())
            // .filter((t)=>t && t.length>0);
    }

    static get_desc(text) {
        return (text || '').split('\n')
            .slice(1)
            .join('\n');
    }

}