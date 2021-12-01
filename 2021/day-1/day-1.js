import {readLines} from '../file-utils';

const input = readLines('day-1/input.txt').map((value) => Number(value));

const getCount = (input) => {
    const {result} = input.reduce((acc, value) => {
        if (acc.lastValue) {
            const result = value > acc.lastValue ? acc.result + 1 : acc.result;

            return {result, lastValue: value};
        }
        return {...acc, lastValue: value};
    }, {result: 0, lastValue: null});

    return result;
}

console.log({day1: getCount(input)});


const {threeMeasurementWindow} = input.reduce((acc, value) => {
    const {threeMeasurementWindow, rolling1, rolling2, rolling3} = acc;

    if (rolling1.length === 0 && rolling2.length === 0 && rolling3.length === 0) {
        rolling1.push(value);
    }
    else if (rolling3.length === 2) {
        threeMeasurementWindow.push(rolling3[0] + rolling3[1] + value);
        rolling3.length = 0;

        rolling1.push(value);
        rolling2.push(value);
    } else if (rolling2.length === 2) {
        threeMeasurementWindow.push(rolling2[0] + rolling2[1] + value);
        rolling2.length = 0;

        rolling1.push(value);
        rolling3.push(value);
    } else if (rolling1.length === 2) {
        threeMeasurementWindow.push(rolling1[0] + rolling1[1] + value);
        rolling1.length = 0;
        rolling2.push(value);
        rolling3.push(value);
    } else if (rolling1.length === 1) {
        rolling1.push(value);
        rolling2.push(value);
    }

    return {threeMeasurementWindow, rolling1, rolling2, rolling3};
}, {threeMeasurementWindow: [], rolling1: [], rolling2: [], rolling3: []});

console.log({part2: getCount(threeMeasurementWindow)});