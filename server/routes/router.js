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
    let queryText=`INSERT INTO "tasks" ("text")
    VALUES ($1); `
    pool.query(queryText, [req.body.text])
    .then(result => {
      res.sendStatus(201);
    })
    .catch(error => {
      console.log(`Error adding new task`, error);
      res.sendStatus(500);
    });
})







// PUT
router.put('/:id', (req, res) => {
    console.log('got to task-put');
    console.log('completing', req.params.id);

    let queryText = `UPDATE "tasks" SET "complete"='true'  WHERE "tasks".id = $1;`;
    
    pool.query(queryText, [req.params.id])
    .then(result => {
      res.sendStatus(200);
    })
    .catch(error => {
      console.log(`Error deleting task`, error);
      res.sendStatus(500);
    });
    
    
    
})



// DELETE
router.delete('/tasks', (req, res) => {
    console.log('got to tasks-delete');
    console.log(req.body);
    let deleteID = req.body.id

    let queryText = `DELETE FROM "tasks" WHERE "tasks".id = ${deleteID};`;

    pool.query(queryText)
    .then(result => {
      res.sendStatus(200);
    })
    .catch(error => {
      console.log(`Error deleting task`, error);
      res.sendStatus(500);
    });

})




module.exports = router