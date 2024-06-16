const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

router.get('/bank-list', (req, res) => {
    const uniqueBanks = Array.from(new Set(req.app.locals.bankData.map(row => JSON.stringify({ bank_name: row.bank_name, bank_id: row.bank_id }))))
        .map(bank => JSON.parse(bank));
    console.log('uniqueBanks:', uniqueBanks);

    res.json(Array.from(uniqueBanks));
});

router.get('/bank-branches/:bankID/:bankBranch', [
    check('bankID').isLength({ min: 1 }).withMessage('Bank ID is required'),
    check('bankBranch').isLength({ min: 1 }).withMessage('Bank Branch is required')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { bankID, bankBranch } = req.params;

    const branches = req.app.locals.bankData.filter((row) => row.bank_id === bankID && row.branch === bankBranch);

    if (branches.length === 0) {
        res.status(404).json({ message: 'Bank not found' });
    } else {
        res.json(branches);
    }
});

module.exports = router;