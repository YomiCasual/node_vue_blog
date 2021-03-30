import conn, { queryDatabase } from '../db/index.js'



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


export const editBlog = async (req, res) => {
    const {id} = req.user
    const {blogId} = req.params
    const { message} = req.body
    let images = req.files
  
    images = images.map(item => "myuploads/" + item.filename).join(', ').replace(/,(?!.*,)/gmi, ',');
    const query1 = 'select * from blogs where author_id = ? and id = ?'
    try {
        const response = await queryDatabase(query1, [id, blogId])
       if (response.length === 0) return res.status(400).json({
           isSuccessful: false,
           message: "No such blog exists"
       })
       const blog = response[0]
       const query2 = `UPDATE blogs SET message = ?, image = ? WHERE id = ?;`  
      
       const response2 = await queryDatabase(query2, [ message || blog.message, images || blog.image, blogId  ])
       return res.status(200).json({
           isSuccessful: true,
           message: "updated Successfully"
       })
    } catch (error) {
        res.status(400).json({
            isSuccessful: false,
            message: error
        })
    }
}

export const deleteBlog = async (req, res) => {
    const {id} = req.params
    const { id: authorId } = req.user
    const query = 'DELETE from blogs where id = ? AND author_id = ?'
    try {
        const response = await queryDatabase(query, [id, authorId])
        if(!response.affectedRows) {
            return res.status(400).json({
                isSuccessful: false,
                message: "Wrong Credentials/Data"
            })
        }
        return res.status(202).json({
            isSuccessful: true,
            message: "Deleted Successfully"
        })
    } catch (error) {
        return res.status(400).json({
            isSuccessful: false,
            message: error
        })
    }
}

