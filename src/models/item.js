export default class Item {
    static samples() {
        return [
            {id: 1, icon: 'mdi-hamburger', name: 'Burger', description: 'A delicious burger', price: 5.99, quantity: 1},
            {id: 2, icon: 'mdi-french-fries', name: 'Fries', description: 'A delicious fries', price: 2.99, quantity: 1},
            {id: 3, icon: 'mdi-ice-cream', name: 'Ice Cream', description: 'A delicious ice cream', price: 3.99, quantity: 1},
            {id: 4, icon: 'mdi-pizza', name: 'Pizza', description: 'A delicious pizza', price: 7.99, quantity: 1},
            {id: 5, icon: 'mdi-chart-donut', name: 'Donut', description: 'A delicious donut', price: 1.99, quantity: 1},
        ].map((it)=>new Item(it));
    }

    constructor({id, icon, name, description, price, quantity}) {
        this._id = id;
        this._icon = icon;
        this._name = name;
        this._description = description;
        this._price = price;
        this._quantity = quantity;
    }

    get id() {
        return this._id;
    }

    get icon() {
        return this._icon;
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    get price() {
        return this._price;
    }

    get quantity() {
        return this._quantity;
    }
}