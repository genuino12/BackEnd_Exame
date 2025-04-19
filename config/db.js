import mysql from 'mysql2/promise';

// Configuração da conexão com o banco de dados.
const pool = mysql.createPool({
    host: "localhost",     
    user: "root",          
    password: "",          
    database: "pizzaria_db"  
});

export default pool;
