const readline = require("readline");
const fs = require("fs");
const _ = require("lodash");
const RBTree = require("bintrees").RBTree;

// function findPair(target, tree:) {
//   let iterator =
// }

async function main() {
  const fileStream = fs.createReadStream("./day6.txt");
  const file = readline.createInterface({ input: fileStream });

  const numbers = [];
  for await (const line of file) {
    numbers.push(_.parseInt(line));
  }

  const tree = new RBTree((a, b) => a - b);
  for (let i = 0; i < 25; i++) {
    tree.insert(numbers[i]);
  }
  for (let i = 25; i < numbers.length; i++) {
    const number = numbers[i];

    let it = tree.iterator();
    let item = null;
    while ((item = it.next()) !== null) {
      // do stuff with item
    }
    iterator.next();

    if (findPair(number, tree)) {
      tree.remove(numbers[i - 25]);
      tree.insert(number);
    } else {
      console.log(number);
      return;
    }
  }
}

main();
