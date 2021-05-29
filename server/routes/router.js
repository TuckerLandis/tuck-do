const express = require('express');
const router = express.Router();
// DB CONNECTION
const pool = require('../modules/pool')
const pg = require('pg')


// GET
router.get('/', (req, res) => {
    console.log('got to tasks-get');
    let queryText = 'SELECT * FROM "tasks"'; //order by time due here?
    pool.query(queryText).then(result => {
      
      res.send(result.rows);
    })
    .catch(error => {
      console.log('error getting tasks', error);
      res.sendStatus(500);
    });
   

})






// POST
router.post('/', (req, res) => {
    console.log('got to task-post');
    console.log(req.body);
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