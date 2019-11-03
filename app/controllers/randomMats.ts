



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

    return { first, second, flag, operator, result, options };
}


interface operation {
    first: number;
    second: number;
    operator: string;
    result: number;
}
