const path = require('path');
const express = require('express');

var router = express.Router();

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

router.get('/gold/', function(req, res) {
    res.sendFile(path.join(__dirname + '/goldgraph/gold.html'));
});

router.get('/market/', function(req, res) {
    res.sendFile(path.join(__dirname + '/marketgraphs/pricegraph.html'));
});

module.exports = router;