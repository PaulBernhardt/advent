const readline = require("readline");
const fs = require("fs");
const _ = require("lodash");

const GOAL = "shiny gold";
const tree = {};

function parseBags(bagStr) {
  const [count, adjective, colour, bag] = bagStr.split(" ");
  return { count, adjective, colour, key: `${adjective} ${colour}` };
}

function parseBag(bagStr) {
  const [adjective, colour, bag] = bagStr.split(" ");
  return { adjective, colour, key: `${adjective} ${colour}` };
}

function countBags(colour, record) {
  let count = 1;
  const leafs = tree[colour] || [];
  for (const leaf of leafs) {
    count += countBags(leaf, record);
  }
  return count;
}

async function main() {
  const fileStream = fs.createReadStream("./day7.txt");
  const file = readline.createInterface({ input: fileStream });

  for await (const line of file) {
    const [container, containees] = line.split(" contain ");
    if (containees == "no other bags.") {
      continue;
    }
    const outerBag = parseBag(container);
    for (const containee of containees.split(", ")) {
      const innerBag = parseBags(containee);
      const leaf = _.get(tree, innerBag.key, []);
      leaf.push(outerBag.key);
      tree[innerBag.key] = leaf;
    }
  }

  console.log(countBags(GOAL, {}) - 1);
}

main();
