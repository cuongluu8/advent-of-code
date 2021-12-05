import {readLines} from '../file-utils';

const [numbersStr,...cardLines] = readLines('day-4/input.txt').filter((line) => Boolean(line));
const cardLineObjects = cardLines.map((line) => {
    return line.trim().split(/\s+/).map((number, index) => ({
        number: parseInt(number, 10),
        checked: false,
        index
    }));
});

const {cards} = cardLineObjects.reduce((acc, line) => {
    if (acc.lines.length === 4) {
        return {cards: [...acc.cards, [...acc.lines, line]], lines: []}
    } else {
        return { ...acc, lines: [...acc.lines, line]};
    }
}, {cards: [], lines: []})

// console.log({numbers, cards});

const markNumberOnCard = (card, number) => {
    for (let i = 0 ; i < card.length; i++) {
        const line = card[i];

        for(let j = 0; j < line.length; j++) {
            const numObj = line[j];
            if (numObj.number === number) {
                numObj.checked = true;

                return;
            }
        }
    }
};

const checkCardWon = (card) => {
    const cols = [...Array(card[0].length)].map((ignore, index) => {
       return card.map((line) => line[index]);
    });

    const winning = (card.some((line) => line.every(({checked}) => checked))) ||
        (cols.some((col) => col.every(({checked}) => checked)));

    return winning;
};

const printAnswer = (card, num) => {
    const uncheckedValue = card.flat().filter(({checked}) => !checked).map(({number}) => number).reduce((val, num) => val + num, 0);

    console.log({answer: uncheckedValue * num});
};

const numbers = numbersStr.split(",");

let winningCardIndex = 0;

for(let i = 0; i < numbers.length; i++) {
    const num = parseInt((numbers[i]), 10);

    cards.forEach(card => {
        if (card.winningCardIndex === undefined) {
            markNumberOnCard(card, num);
            const won = checkCardWon(card);

            if (won) {
                card.winningCardIndex = winningCardIndex;
                card.winningNum = num;
                winningCardIndex++;
            }
        }
    });
}

cards.sort((a, b) => a.winningCardIndex - b.winningCardIndex );
console.log(cards[0]);

printAnswer(cards[0], cards[0].winningNum);
printAnswer(cards[cards.length - 1], cards[cards.length - 1].winningNum);



