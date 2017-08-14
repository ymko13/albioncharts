const express = require('express');
const bodyParser = require('body-parser');
const postHandlers = require('./controllers/posthandlers.js');
const getHandlers = require('./controllers/gethandlers.js');
const htmlServant = require('./html/htmlservant.js');

const app = express();
Initialize(app);

function listenCallback(err)
{
    if (err) throw err;
    console.log('Server started on port 8080');
}

function Initialize(app)
{
    app.use(bodyParser.json());
    app.use('/static', express.static('public'))
    
    postHandlers.Init(app);
    getHandlers.Init(app);
    htmlServant.Init(app);
    
    app.listen(8081, listenCallback)
}