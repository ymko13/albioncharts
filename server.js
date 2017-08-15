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
    const host = app.address().address;
    const port = app.address().port;
  
    console.log(`Listening at http://${host}:${port}`);
}

function Initialize(app)
{
    app.use(bodyParser.json());
    app.use('/static', express.static('public'))
    
    postHandlers.Init(app);
    getHandlers.Init(app);
    htmlServant.Init(app);
    
    app.listen(8080, listenCallback)
}