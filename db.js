async function connect(){
    if(global.connection && global.connection.state !== 'discconnectd')
        return global.connection;

    const mysql = require("mysql2/promisse");
    const connection = await mysql.createConnection("mysql://root:user@localhost:3306/tcc_db.sql");
    console.log("conectou no msql!");
    global.connection = connection;
    return connection;
}