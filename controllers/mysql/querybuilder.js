function whereEqualsClause(name, value, quoted)
{
    if(value)
    {
        if(quoted)
            return name + " = '" + value +"'";
        else
            return name + " = " + value;
    }

    return null;
}

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

module.exports = {
    buildWhere:buildWhere
 };