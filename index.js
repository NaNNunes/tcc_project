async function connect(){
    if(global.connection && global.connection.state !== 'discconnectd')
        return global.connection;

    const mysql = require("mysql2/promisse");
    const connection = await mysql.createConnection("")
}