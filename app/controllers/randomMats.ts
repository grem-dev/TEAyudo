
import { words } from '../resources/resourcesLoad'


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

    static auxWords = "HIJKLMNÑOPQRSTWXYZ";

    static words = "ABCDEFG";
    static numbers = "1234567890";

    // Non implemented for now
    static generateRandomNumber() {
        return null;
    }


    /**
     * Generate a random word ammong all the words of the classic keyboard
     * @param current the current value, used for don't generate the same number
     */
    static generateRandomWord(current?: string): string {


        let output = RandomWords.words[Math.floor(Math.random() * RandomWords.words.length)];

        if (current) {
            while (output === current[0]) {
                output = RandomWords.words[Math.floor(Math.random() * RandomWords.words.length)];
            }
        }


        return output;
    }

	/**
	 * Compare two parameter and return a bolear if the value is completly equal to the second patameters
	 * @param a first leter what will be compare with b
	 * @param b string [char] to be compare
	 */
    static compare(a: string, b: string): boolean {

        return (a === b) ? true : false;

    }

}