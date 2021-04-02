import conn, { queryDatabase } from '../db/index.js'



export const createComment = async (req, res) => {

    const{comment} = req.body
    const { blogId } = req.params
    const user = req?.user.id || null

    if (!blogId) {
        return res.status(400).json({
            isSuccessful: false,
            message: "Please supply the the blog Id"
        })
    }

    const query = `INSERT INTO comments(comment, blog_id, userId, date_created) values (?, ? , ?, now())`

    try{
        let response = await queryDatabase(query, [comment,  blogId, user])

        return res.status(201).json({
            isSuccessful: true,
            data: "Comment Successfully created"
        })
    }catch(err) {
        return res.status(400).json({
            isSuccessful: false, 
            message: err
        })
    }
}



