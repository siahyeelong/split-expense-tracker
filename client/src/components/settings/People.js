export class Person {
    constructor(identifier, displayName, favColour) {
        this.identifier = identifier;
        this.displayName = displayName;
        this.favColour = favColour;
    }

    static findDisplayName(identifier, people) {
        const person = people.find(person => person.identifier === identifier);
        return person ? person.displayName : 'Not found';
    }

    static findFavColour(identifier, people) {
        const person = people.find(person => person.identifier === identifier);
        return person ? person.favColour : '#CCCCCC';
    }
}

export const People = [
    new Person('gmom', "Grayce's Mom", '#FA9189'),
    new Person('gdad', "Grayce's Dad", '#FCAE7C'),
    new Person('ymom', "YL's Mom", '#FFE699'),
    new Person('ydad', "YL's Dad", '#F9FFB5'),
    new Person('yx', "Yu Xiang", '#B3F5BC'),
    new Person('danning', "Dan Ning", '#D6F6FF'),
    new Person('yt', "Yu Tian", '#E2CBF7'),
    new Person('yr', "Chubby", '#D1BDFF'),
    new Person('sl', "Sin Lu", '#B3F5BC'),
    new Person('grayce', "grayce", '#E2CBF7'),
    new Person('yl', "yl", '#D6F6FF'),
];
