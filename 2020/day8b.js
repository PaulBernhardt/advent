const readline = require("readline");
const fs = require("fs");
const _ = require("lodash");

async function main() {
  const fileStream = fs.createReadStream("./day8.txt");
  const file = readline.createInterface({ input: fileStream });
  let acc = 0;
  const instructions = [];
  for await (const line of file) {
    const [command, value] = line.split(" ");
    instructions.push({ command, value: _.parseInt(value) });
  }

  for (let j = instructions.length - 1; j > 0; j--) {
    let mod = instructions[j];
    if (mod.command == "acc") {
      continue;
    }

    mod.command = mod.command == "jmp" ? "nop" : "jmp";
    let i = 0;
    acc = 0;
    let hit = new Set();
    while (true) {
      if (hit.has(i)) {
        break;
      }
      if (i >= instructions.length) {
        j = -1;
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
    mod.command = mod.command == "jmp" ? "nop" : "jmp";
  }
  console.log(acc);
}

main();
