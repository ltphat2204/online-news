import { getArticlesByWriterUsername } from "../models/articles.js";
import { getUserByUsername } from "../models/user.js";

export const viewProfile = async (req, res) => {
    const { username } = req.params;
    console.log(req.session)

    const profile = await getUserByUsername(username);
    const articles = await getArticlesByWriterUsername(username);

    res.render('profile/profile',  {
        title: `Profile - ${profile.username}`,
        profile: profile,
        articles: articles
    });
}