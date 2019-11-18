
import { words, animals, fruits } from '../resources/resourcesLoad'


/**
 * @return Return an object that contains the elemnts 
 * of a simple operation and its values:
 * @params FirstValue, SecondValue, Operator and Result
 */
export function GenerateOperation<operation>(level) {

    level = level > 0 ? level : 1;

    let first = Math.floor(Math.random() * (level * 10));
    let second = Math.floor(Math.random() * (level * 10));
    let operator;
    let result;

    let flag = Math.floor(Math.random() * level);

    switch (flag) {
        case 0:
            operator = '+';
            result = first + second;
            break;
        case 1:
            operator = '-';
            result = first - second;
            break;
        case 2:
            operator = 'x';
            result = first * second;
            break;
        case 3:
            operator = '/';
            result = first / second;
            break;
        default:
            operator = '-';
            result = first + second;
            break;
    }

    let options = [];

    for (let index = 0; index < 4; index++) {
        options.push(Math.floor(Math.random() * level * 10))
    }

    options[Math.floor(Math.random() * 3)] = result;

    return { first, second, operator, result, options };
}


interface operation {
    first: number;
    second: number;
    operator: string;
    result: number;
    options: number[];
}

export class RandomWords {


    type: string;
    items: string[];

    constructor(type: string, items: []) {
        this.type = type;
        this.items = items;
    }


    /**
     * Generate a random word ammong all the words of the classic keyboard
     * @param current the current value, used for don't generate the same number
     */
    generate(current?: string): string {


        let output = this.items[Math.floor(Math.random() * this.items.length)];

        if (current) {
            while (output === current) {
                output = this.items[Math.floor(Math.random() * this.items.length)];
            }
        }


        return output;
    }

    /**
     * Return an image
     * @param name Name of the element to generate
     */
    getImage(name: string) {

        name = name.toLocaleLowerCase();

        let output;

        switch (this.type) {
            case 'animals':

                output = animals[name];
                break;
            case 'fruits':
                output = fruits[name];
                break;
            case 'letras':
                output = words[name];
                break;
            default:
                output = words['c'];
                break;
        }


        return output;
    }

}