const readline = require("readline");
const fs = require("fs");
const _ = require("lodash");

const TREE = "#";
async function main() {
  const fileStream = fs.createReadStream("./day3.txt");
  const file = readline.createInterface({ input: fileStream });
  const lines = [];
  for await (const line of file) {
    lines.push(line);
  }

  let trees = 0;
  const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];
  let pos = 0;
  const results = [];
  for (const slope of slopes) {
    trees = 0;
    pos = 0;
    for (let j = 0; j < lines.length; j += slope[1]) {
      const line = lines[j];
      if (line[pos] == TREE) {
        trees++;
      }
      pos = (pos + slope[0]) % line.length;
    }
    results.push(trees);
  }
  console.log(results.reduce((prev, cur) => cur * prev, 1));
}

main();
