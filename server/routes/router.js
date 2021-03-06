const express = require('express');
const router = express.Router();
// DB CONNECTION
const pool = require('../modules/pool')
const pg = require('pg')


// GET
router.get('/', (req, res) => {
  console.log('got to tasks-get');
  let queryText = `SELECT * FROM "tasks" ORDER BY "dueDate" ASC;`
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
  let queryText = `INSERT INTO "tasks" ("text", "dueDate")
    VALUES ($1, $2); `
  pool.query(queryText, [req.body.text, req.body.date])
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

  let completeDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

  let queryText = `UPDATE "tasks" SET "complete"='true', "completeDate"='${completeDate}' WHERE "tasks".id = $1;`;

  pool.query(queryText, [req.params.id])
    .then(result => {
      res.sendStatus(200);
    })
    .catch(error => {
      console.log(`Error updating task`, error);
      res.sendStatus(500);
    });
})


// DELETE
router.delete('/', (req, res) => {
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