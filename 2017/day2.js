var tabson = require('tabson');

tabson('./day2.tsv', {type: 'array', sep: "\t"}, (error, header, data) => {
    let total = 0;
    for (let row of data) {
        let min = Infinity;
        let max = -Infinity;

        for (let i = 0; i < row.length - 1; i++) {
            let x = parseInt(row[i]);
            for (let j = i + 1; j < row.length; j++) {
                let y = parseInt(row[j]);
                let max = Math.max(x, y);
                let min = Math.min(x, y)
                if (max % min == 0) {
                    total += max / min;
                }
            }
        }
    }
    console.log(total)
});
