import conn from '../db/index.js'



export const createBlog = (req, res) => {
    const {id} = req.user
    const {message, author_id} = req.body
    let images = req.files
    // let secondImage = [images.slice(0, -1).join(', '), images.slice(-1)[0]].join(images.length < 2 ? '' : ' , ');
   
    images = images.map(item => "myuploads/" + item.filename).join(', ').replace(/,(?!.*,)/gmi, ',');


    const query = `INSERT INTO blogs(message, createdAt, image, author_id) values (?,now(),?,?)`


     conn.query(query,[message,images, id], (err, result) => {
        if (err) {
            return res.status(400).json({
                isSuccessful: false, 
                message: err
            })
        }

        return res.status(201).json({
            isSuccessful: true,
            message: "Blog created successfully"
        })
    })
}

export const getBlogByUser = (req, res) => {
    const { id} = req.user
    if(!id) return res.status(400).json({
        isSuccessful: false,
        message: "Please provide the id"
    })

    const query = 
    `select blogs.message, blogs.id, blogs.image, users.username 
    as author from blogs join users on blogs.author_id = ?
    where users.id = ?`


    conn.query(query,[id, id], (err, result) => {
        if (err) {
            return res.status(400).json({
                isSuccessful: false, 
                message: err
            })
        }

        return res.status(200).json({
            isSuccessful: true,
            message: result
        })
    })

}

