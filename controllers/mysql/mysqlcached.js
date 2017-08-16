const cache = require('memory-cache');
const mysql = require('mysql');

var mysqlcache = new cache.Cache();

var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DB
  });
  
con.connect(function(err) {
    if (err) throw err;
});

function readFrom(query, callback, cacheTime)
{
    if(cacheTime) {} else cacheTime = 1000;

    var cached = mysqlcache.get(query);

    if(cached)
    {
        callback(cached);
    }
    else
    {
        con.query(query, function (err, result, fields) {
            if (err) throw err;
            
            mysqlcache.put(query, result, cacheTime);

            callback(result);
        });
    }
}

function writeTo(sql, data, callback)
{
    con.query(sql, data, function (err, result) {
        if (err) throw err;

        console.log('Records updated: ' + result.affectedRows);
        
        if(callback) callback(result);
      });  
}

module.exports = 
{
    readFrom:readFrom,
    writeTo:writeTo
}