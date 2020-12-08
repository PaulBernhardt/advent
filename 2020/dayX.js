const readline = require("readline");
const fs = require("fs");
const _ = require("lodash");

async function main() {
  const fileStream = fs.createReadStream("./day6.txt");
  const file = readline.createInterface({ input: fileStream });

  for await (const line of file) {
  }
}

main();
