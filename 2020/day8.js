const readline = require("readline");
const fs = require("fs");
const _ = require("lodash");

async function main() {
  const fileStream = fs.createReadStream("./day8.txt");
  const file = readline.createInterface({ input: fileStream });

  const instructions = [];
  for await (const line of file) {
    const [command, value] = line.split(" ");
    instructions.push({ command, value: _.parseInt(value) });
  }

  let i = 0;
  let acc = 0;
  let hit = new Set();
  while (true) {
    if (hit.has(i)) {
      break;
    }
    hit.add(i);
    const instruction = instructions[i];
    switch (instruction.command) {
      case "acc":
        acc += instruction.value;
        i++;
        break;
      case "jmp":
        i += instruction.value;
        break;
      case "nop":
        i++;
        break;
    }
  }
  console.log(acc);
}

main();
