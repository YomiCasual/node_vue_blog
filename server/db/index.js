import mysql from 'mysql'

const conn = mysql.createPool({
	connectionLimit: 10,
	password: 'Tobiloba-186071',
	user: 'root',
	database: 'blog',
	host: 'localhost',
	port: '3306',
});


export const queryDatabase = (query, params) => {
    return new Promise((resolve, reject) => {
        conn.query(query, params, (err, result) => {
            if(err) {
                return reject(err)
            }
            return resolve(result)
        })
    })
}

export default conn