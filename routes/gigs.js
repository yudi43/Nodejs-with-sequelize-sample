const express = require('express')
const router = express.Router();
const db = require('../config/database')
const gig = require('../models/gig');


router.get('/', (req, res) => res.send(gig.findAll()
    .then((gigs) => {
        console.log(gigs)
        res.sendStatus(200);
    })
    .catch((err) => console.log(err))
));


module.exports = router;