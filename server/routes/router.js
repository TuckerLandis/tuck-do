const express = require('express');
const router = express.Router();
// DB CONNECTION
const pool = require('../modules/pool')
const pg = require('pg')

router.get('/', (req, res) => {
    console.log('got to items');
    res.sendStatus(200);
})







module.exports = router