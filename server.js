const express = require('express');
const bodyParser = require('body-parser');
const postHandlers = require('./controllers/posthandlers.js');
const getHandlers = require('./controllers/gethandlers.js');
const htmlServant = require('./html/htmlservant.js');

const app = express();
const port = 8080;
Initialize(app);

function listenCallback(err)
{
    if (err) throw err;  
    console.log(`Listening at ${port}`);
}

function Initialize(app)
{
    app.set('trust proxy', true);
    
    app.use(bodyParser.json());
    app.use('/static', express.static('public'))
    
    postHandlers.Init(app);
    getHandlers.Init(app);
    htmlServant.Init(app);
    
    const server = app.listen(port, listenCallback)
}