import mysql from 'mysql'

const conn = mysql.createPool({
	connectionLimit: 10,
	password: 'Tobiloba-186071',
	user: 'root',
	database: 'blog',
	host: 'localhost',
	port: '3306',
});

export default conn