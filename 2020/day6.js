const readline = require("readline");
const fs = require("fs");
const _ = require("lodash");

function countQuestions(questions, guests) {
  let count = 0;
  for (const key of Object.keys(questions)) {
    if (questions[key] == guests) {
      count++;
    }
  }
  return count;
}

async function main() {
  const fileStream = fs.createReadStream("./day6.txt");
  const file = readline.createInterface({ input: fileStream });

  let count = 0;
  let questions = {};
  let guests = 0;
  for await (const line of file) {
    if (line.length == 0) {
      count += countQuestions(questions, guests);
      questions = {};
      guests = 0;
      continue;
    }
    guests++;
    for (const letter of line) {
      questions[letter] =
        questions[letter] !== undefined ? questions[letter] + 1 : 1;
    }
  }
  if (questions != {}) {
    count += countQuestions(questions, guests);
  }
  console.log(count);
}

main();
