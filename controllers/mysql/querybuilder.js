function whereEqualsClause(name, value, quoted, date)
{
    if(value)
    {
        if(date)
        {
            return name + " > '" + value +"'";            
        }
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
        clauses.push(whereEqualsClause(element[0], element[1], element[2], element[3]));   
    }, this);

    var added = false;

    for (var i = 0; i < clauses.length; i++) {
        if(!clauses[i]) continue;

        if(!added)
        {
            added = true;
            query = query + " WHERE ";
        } 
        else
        {
            query = query + " AND ";
        } 
    
        query += clauses[i];
    }

    return query;
}

module.exports = {
    buildWhere:buildWhere
 };