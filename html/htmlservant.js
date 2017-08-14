const path = require('path');

function Init(app)
{
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname + '/index.html'));
    });

    app.get('/gold/', function(req, res) {
        res.sendFile(path.join(__dirname + '/goldgraph/gold.html'));
    });

    app.get('/market/', function(req, res) {
        res.sendFile(path.join(__dirname + '/marketgraphs/pricegraph.html'));
    });
}

module.exports = {
    Init:Init
 };