const csvParser = require('csv-parser');
const fs = require('fs');

function readCsvFile(filePath) {
    let bankData = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on('data', (row) => {
                bankData.push(row);
            })
            .on('end', () => {
                resolve(bankData);
            })
            .on('error', (err) => {
                console.error('Error reading CSV file:', err);
                reject(err);
            });
    });
}

module.exports = readCsvFile;