const express = require('express');
const router = express.Router();
// DB CONNECTION
const pool = require('../modules/pool')
const pg = require('pg')


// GET
router.get('/', (req, res) => {
    console.log('got to tasks-get');
    res.sendStatus(200);
})
// POST
router.post('/', (req, res) => {
    console.log('got to task-post');
    res.sendStatus(201);
})
// PUT
router.put('/', (req, res) => {
    console.log('got to task-put');
    res.sendStatus(202);
})
// DELETE
router.delete('/', (req, res) => {
    console.log('got to tasks-delete');
    res.sendStatus(202);
})




module.exports = router