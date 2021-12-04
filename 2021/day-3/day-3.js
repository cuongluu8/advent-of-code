import {readLines} from '../file-utils';

const input = readLines('day-3/input.txt')
    .map((line) => line.split(""));

const getCounts = (input, colIndex) => {
     const codeResult = input.reduce((result, code) => {
          if (code[colIndex] === "0") {
               return {
                    ...result, zero: result.zero + 1
               }
          } else {
               return {
                    ...result, one: result.one + 1
               }
          }
     }, {one: 0, zero: 0})

     return codeResult;
}

const getResult = (input) => [...new Array(input[0].length)].reduce((acc, ignore, colIndex) => {
     const codeResult = getCounts(input, colIndex)

     return [...acc, codeResult];
}, []);

const result = getResult(input);

// console.log({result});

const gamma = result.reduce((acc, {one, zero}) => {
     return `${acc}${one > zero ? "1" : "0"}`
},"")

const epsilon = result.reduce((acc, {one, zero}) => {
     return `${acc}${one > zero ? "0" : "1"}`
},"")


const gammaInt = parseInt(gamma, 2);
const epsilonInt = parseInt(epsilon, 2);

const answer = gammaInt * epsilonInt;

// console.log({answer});

// const filter = (list, oneOrZero, colIndex) => list[colIndex] === oneOrZero;
//
const firstZeroOrOne = result[0].one >= result[0].zero ? 1 : 0;
const getOxygen = (input, firstZeroOrOne) => {
     let filteredInput = [...input];
     let zeroOrOne = firstZeroOrOne;
     let colIndex = 0;

     do {
          filteredInput = filteredInput.filter((code) => {
               return Number(code[colIndex]) === zeroOrOne;
          });
          colIndex++;
          const { zero, one } = getCounts(filteredInput, colIndex);
          zeroOrOne = one >= zero ? 1 : 0;
     } while (filteredInput.length > 1)

     return parseInt(filteredInput[0].join(""), 2);
};

const getCO2 = (input, firstZeroOrOne) => {
     let filteredInput = [...input];
     let zeroOrOne = firstZeroOrOne;
     let colIndex = 0;

     do {
          filteredInput = filteredInput.filter((code) => {
               return Number(code[colIndex]) === zeroOrOne;
          });
          colIndex++;
          const { zero, one } = getCounts(filteredInput, colIndex);
          zeroOrOne = one >= zero ? 0 : 1;
     } while (filteredInput.length > 1)

     return parseInt(filteredInput[0].join(""), 2);
};

const oxygen = getOxygen(input, firstZeroOrOne);
const co2 = getCO2(input, firstZeroOrOne === 1 ? 0 : 1);

const day3part2 = oxygen * co2;

console.log({day3part2});
