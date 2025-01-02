import { createComment } from "../models/comments.js";

export const handlePostComment = async (req, res) => {
    const article_id = req.params.id;
    const { content } = req.body;

    if (req.session.auth) {
        const { id, fullname } = req.session.authUser;

        await createComment(content, fullname, article_id, id);
    }
    else {
        const { guest_name } = req.body;
        
        await createComment(content, guest_name, article_id);
    }
        
    res.redirect(`/articles?id=${article_id}`);
}