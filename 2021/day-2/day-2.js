import {readLines} from '../file-utils';

const input = readLines('day-2/input.txt')
    .map((line) => line.split(" "));

{
    const {horizontal, depth} = input.reduce((result, [action, valueStr]) => {
        const value = Number(valueStr);

        if (action === "forward") {
            const horizontal = result.horizontal + value

            return {...result, horizontal};
        } else if (action === "down") {
            const depth = result.depth + value

            return {...result, depth};
        } else if (action === "up") {
            const depth = result.depth - value

            return {...result, depth};
        }
    }, {horizontal: 0, depth: 0})

    const result = horizontal * depth;

    console.log({result, horizontal, depth});

}

const { horizontal, depth } = input.reduce((result, [action, valueStr]) => {
    const value = Number(valueStr);

    if (action === "forward") {
        const horizontal = result.horizontal + value;
        const depth = result.depth + (result.aim > 0 ? value * result.aim : 0);

        return { ...result, horizontal, depth };
    } else if (action === "down") {
        const aim = result.aim + value

        return { ...result, aim };
    } else if (action === "up") {
        const aim = result.aim - value

        return { ...result, aim };
    }
}, {horizontal: 0, depth: 0, aim: 0})

const result2 = horizontal * depth;

console.log({result2, horizontal, depth});