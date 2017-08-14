const path = require('path');
var mysql = require('./mysql/mysql.js');
var mySqlDates = require('./mysql/mysqldates.js');

function buildWhere(data)
{
    var query = "";

    var clauses = [];
    
    data.forEach(function(element) {
        clauses.push(whereEqualsClause(element[0], element[1], element[2]));   
    }, this);

    for (var i = 0; i < clauses.length; i++) {
        if(!clauses[i]) continue;

        if(i == 0) query = query + " WHERE ";
        else if(i != clauses.length - 1) query = query + " AND ";
    
        query += clauses[i];
    }

    return query;
}

function whereEqualsClause(name, value, type)
{
    if(value)
    {
        if(type == 'string')
            return name + " = '" + value +"'";
        else
            return name + " = " + value;
    }

    return null;
}

function Init(app)
{
    app.get('/api/goldprices', function(req, res) {     
        mysql.query("SELECT Id, Value FROM gold_prices", function (err, result, fields) {
            if (err) throw err;
            res.json(result);
          }); 
    });

    app.get('/api/market/:location/:type/', function(req, res) {   
        mysql.query("SELECT * FROM auction_line WHERE ItemTypeId = '" + req.params.type + "' AND LocationId = " + req.params.location, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
          }); 
    });


    app.get('/api/market/', function(req, res) {
        var query = "SELECT * FROM auction_line";
        var acceptedProperties = [
            ["ItemTypeId", req.query.itemtype,'string'],
            ["LocationId", req.query.location,''],
            ["EnchantmentLevel", req.query.enchantment,''],
            ["QualityLevel", req.query.quality,'']
        ];
        query = query + buildWhere(acceptedProperties);
        console.log(query);
        mysql.query(query, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        }); 
    });
}

module.exports = {
    Init:Init
 };