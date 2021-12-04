#!/bin/bash
while getopts D:E: flag
do
    case "${flag}" in
        D) DAY=${OPTARG};;
        E) EXAMPLE=${OPTARG};;
    esac
done

mkdir source/day$DAY

touch source/day${DAY}/day${DAY}.txt
touch source/day${DAY}/day${DAY}.sample.txt

cat source/dayX/dayX.ts | sed "s/X/$DAY/g ; s/0/$EXAMPLE/g" > source/day${DAY}/day${DAY}.ts
cat source/dayX/dayX.test.ts | sed "s/X/$DAY/g ; s/0/$EXAMPLE/g" > source/day${DAY}/day${DAY}.test.ts
