const readline = require("readline");
const fs = require("fs");
const _ = require("lodash");

async function main() {
  const fileStream = fs.createReadStream("./day2.txt");

  const file = readline.createInterface({ input: fileStream });
  let valid = 0;
  for await (const line of file) {
    const [requirement, letterCode, password] = line.split(" ");
    const letter = letterCode[0];
    const [min, max] = requirement.split("-").map(_.toInteger);
    // let count = 0;
    // for (const l of password) {
    //   if (l == letter) {
    //     count++;
    //   }
    // }
    // if (count <= max && count >= min) {
    //   valid++;
    // }

    if ((password[min - 1] == letter) ^ (password[max - 1] == letter)) {
      valid++;
    }
  }
  console.log(valid);
}

main();
