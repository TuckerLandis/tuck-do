// server init
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// const Parse = require('parse');
let router = require('./routes/router')
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

app.use('/tasks', router);