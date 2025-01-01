import { getArticlesByWriterUsername } from "../models/articles.js";
import { getWriterByUsername } from "../models/user.js";

export const viewProfile = async (req, res) => {
    const { username } = req.params;

    const profile = await getWriterByUsername(username);
    const articles = await getArticlesByWriterUsername(username);

    res.render('profile/profile', {
        title: `Profile - ${profile.username}`,
        profile: profile,
        articles: articles
    });
}