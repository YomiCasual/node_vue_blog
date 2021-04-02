import conn, { queryDatabase } from '../db/index.js';

export const likeBlog = async (req, res) => {
	const { blogId } = req.params;
	const user = req?.user?.id || null;

	if (!blogId) {
		return res.status(400).json({
			isSuccessful: false,
			message: 'Please supply the the blog Id',
		});
	}

	const query1 = `SELECT * from likes where blog_id = ?`;
	const query2 = `INSERT INTO likes(blog_id, count, user_id) values (?, ? , ?)`;
	const query3 = `update likes set count = ?, user_id = ? where blog_id = ?`;

	try {
		const response1 = await queryDatabase(query1, [blogId]);

		if (response1.length === 0) {
			const response2 = await queryDatabase(query2, [blogId, 1, user || null]);
            console.log(response2)
			return await res.status(200).json({
				isSuccessful: true,
				data: 'Successfully liked post',
			});
		} else {
			const former_likers = response1[0].user_id || null
			const former_count = response1[0].count + 1;

            console.log(user)
			const response3 = await queryDatabase(query3, [
				former_count,
				former_likers ? former_likers + " , "  + (user || "") : user || null ,
				blogId,
			]);
			return await res.status(200).json({
				isSuccessful: true,
				data: 'Successfully liked post',
			});
		}
	} catch (error) {
		return res.status(400).json({
			isSuccessful: false,
			message: error,
		});
	}
};
