

const express = require('express');
const readCsvFile = require('./csvReader');
const bankRoutes = require('./bankRoutes');

const app = express();
const port = process.env.PORT || 3000;

readCsvFile('bank_branches.csv')
    .then(data => {
        app.locals.bankData = data;
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    })
    .catch(err => {
        console.error(err);
    });

app.use('/', bankRoutes);