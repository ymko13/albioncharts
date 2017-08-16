const express = require('express');
const bodyParser = require('body-parser');
const routeregistrar = require('./registerroutes.js');
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

    app.use(function (req, res, next) {
        if (req.url.match(/^\/(css|js|img|font)\/.+/)) {
            res.setHeader('Cache-Control', 'public, max-age=3600');
        }
        next();
    });

    app.use('/static', express.static('public'));

    routeregistrar.Init(app);

    app.use((req, res) => { res.status(404).send('') });
    const server = app.listen(port, listenCallback)
}