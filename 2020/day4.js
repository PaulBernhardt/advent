const readline = require("readline");
const fs = require("fs");
const _ = require("lodash");

EYE_COLOURS = new Set(["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]);

function between(value, min, max) {
  const v = _.parseInt(value);
  return v >= min && v <= max;
}

function checkHeight(value) {
  const type = value.substr(-2, 2);
  const height = value.substr(0, value.length - 2);
  if (type == "in") {
    return between(height, 59, 76);
  } else if (type == "cm") {
    return between(height, 150, 193);
  }
  return false;
}

const KEYS = [
  ["byr", (value) => value.length == 4 && between(value, 1920, 2002)],
  ["iyr", (value) => value.length == 4 && between(value, 2010, 2020)],
  ["eyr", (value) => value.length == 4 && between(value, 2020, 2030)],
  ["hgt", checkHeight],
  ["hcl", (value) => value.match(/#[0-9a-f]{6}/)],
  ["ecl", (value) => EYE_COLOURS.has(value)],
  ["pid", (value) => value.length == 9],
  //"cid",
];

function isValid(passport) {
  for (const [key, validator] of KEYS) {
    if (!_.has(passport, key) || !validator(passport[key])) {
      return false;
    }
  }
  return true;
}

async function main() {
  const fileStream = fs.createReadStream("./day4.txt");
  const file = readline.createInterface({ input: fileStream });
  const passports = [];
  let passport = {};
  let dirty = false;
  let valid = 0;
  for await (const line of file) {
    if (line.length == 0) {
      passports.push(passport);
      if (isValid(passport)) {
        valid++;
      }
      passport = {};
      dirty = false;
      continue;
    }
    dirty = true;
    const entries = line.split(" ");
    for (const entry of entries) {
      const [key, value] = entry.split(":");
      passport[key] = value;
    }
  }

  if (dirty) {
    passports.push(passport);
    if (isValid(passport)) {
      valid++;
    }
    passport = {};
    dirty = false;
  }

  console.log(valid);
}

main();
