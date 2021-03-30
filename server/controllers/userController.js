import conn from '../db/index.js'
import bcrypt from 'bcryptjs'
import config from '../config/index.js'
import jwt from 'jsonwebtoken'


export const registerUser = (req, res) => {
    const query = `INSERT INTO users(username, password) values (?, ?)`
    const {username, password} = req.body
    
    if (!username || !password) {
        return res.status(400).json({
            isSuccessful: false,
            message: "Please fill out the required fields"
        })
    }

    const hashedPass = bcrypt.hashSync(password, 10)

    conn.query(query, [username, hashedPass], (err, result) => {
        if (err) {
            return res.status(400).json({
                isSuccessful: false,
                message: err
            })
        }
        
        return res.status(201).json({
            isSuccessful: true,
            message: "User Added successfully"
        })
    })
}


export const loginUser = (req, res) => {
    
    const {username, password} = req.body
    
    if (!username || !password) {
        return res.status(400).json({
            isSuccessful: false,
            message: "Please fill out the required fields"
        })
    }

    const query = `SELECT * FROM users where username = ? `

    conn.query(query, [username], (err, result) => {
        if (err) {
            return res.status(400).json({
                isSuccessful: false,
                message: err
            })
        }

        if (result.length ===0) return res.status(400).json({ isSuccessful: false, meessage: "Wrong Credentials"})

        let user = result[0]
        const decryptPass = bcrypt.compareSync(password, user.password, 10)

        if (!decryptPass) {
            return res.status(400).json({
                isSuccessful: false,
                message: "Wrong Credentials"
            })
        }
        let token = jwt.sign({id: user.id, username: user.username}, config.jsonHash, { expiresIn: '1h' });
        return res.status(201).json({
            isSuccessful: true,
            data: {
                id: user.id,
                username: user.username,
                token: token
            }
        })
    })

    

    
}
