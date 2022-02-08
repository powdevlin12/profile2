const express = require('express')
const router = express.Router()
const Account = require('../models/accounts')
    // GET account
    // localhost:5000/api/accounts
router.get('/', async(req, res) => {
    try {
        const account = await Account.find({})
        if (!account)
            return res.status(400).json({ success: false, message: 'Not found' })
        res.status(200).json({ success: true, message: 'Find completed !', account })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: 'Falure !' })
    }
})

module.exports = router