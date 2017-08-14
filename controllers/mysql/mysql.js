const mysql = require('mysql');

var con = mysql.createConnection({
    host: "35.195.4.36",
    user: "root",
    password: "albiondev",
    database: "albion_market"
  });
  
con.connect(function(err) {
    if (err) throw err;
});

function query(sql, callback)
{
    con.query(sql, callback);
}

function queryMultipleRows(sql, data)
{
    con.query(sql, data, function (err, result) {
        if (err) throw err;
        console.log('Records updated: ' + result.affectedRows);
      });  
}

module.exports = {
    query:query,
    queryMultipleRows:queryMultipleRows
 };