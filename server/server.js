// server init
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
let router = require('./routes/router')
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
//port+listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
//router connection

app.use('/items', router);