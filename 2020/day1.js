const csv = require("csvtojson");
const { toInteger } = require("lodash");

async function dayOne() {
  const data = await csv({ output: "line" }).fromFile("./input.txt", {});

  const sorted = data.map(toInteger).sort((a, b) => a - b);

  for (let i = 0; i <= sorted.length; i++) {
    const first = sorted[i];
    for (let j = i + 1; j < sorted.length; j++) {
      const second = sorted[j];
      if (first + second > 2020) {
        continue;
      }
      for (let k = j; k < sorted.length; k++) {
        const third = sorted[k];
        const total = first + second + third;
        if (total == 2020) {
          return first * second * third;
        } else if (total > 2020) {
          continue;
        }
      }
    }
  }
}

async function main() {
  console.log(await dayOne());
}

main();
