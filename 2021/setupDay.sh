#!/bin/bash
while getopts D:E: flag
do
    case "${flag}" in
        D) DAY=${OPTARG};;
        E) EXAMPLE=${OPTARG};;
    esac
done

if [ -d "source/day$DAY" ]; then
	echo "Folder for Day $DAY already exists, aborting!"
	exit 1
fi
mkdir source/day$DAY


if [ -f "env.sh" ]; then
	source env.sh
	curl -b session=$COOKIE "https://adventofcode.com/2021/day/$DAY/input" > "source/day${DAY}/day${DAY}.txt"
else
	touch source/day${DAY}/day${DAY}.txt
fi
touch source/day${DAY}/day${DAY}.sample.txt

cat source/dayX/dayX.ts | sed "s/X/$DAY/g ; s/0/$EXAMPLE/g" > source/day${DAY}/day${DAY}.ts
cat source/dayX/dayX.test.ts | sed "s/X/$DAY/g ; s/0/$EXAMPLE/g" > source/day${DAY}/day${DAY}.test.ts
