const express = require('express');
const csvParser = require('csv-parser');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

let bankData = [];

function readCsvFile(filePath) {
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

readCsvFile('bank_branches.csv')
    .catch(err => {
        console.error(err);
    });


app.get('/bank-list', (req, res) => {
    const uniqueBanks = Array.from(new Set(bankData.map(row => JSON.stringify({ bank_name: row.bank_name, bank_id: row.bank_id }))))
        .map(bank => JSON.parse(bank));
    console.log('uniqueBanks:', uniqueBanks);

    res.json(Array.from(uniqueBanks));

});

app.get('/bank-branches/:bankID/:bankBranch', (req, res) => {
    const { bankID, bankBranch } = req.params;

    const branches = bankData.filter((row) => row.bank_id === bankID && row.branch === bankBranch);

    if (branches.length === 0) {
        res.status(404).json({ message: 'Bank not found' });
    } else {
        res.json(branches);
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
}); 