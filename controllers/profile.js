import { getArticlesByWriterUsername } from "../models/articles.js";
import { getUserByUsername, editUser } from "../models/user.js";

export const viewProfile = async (req, res) => {
    const { username } = req.params;

    const currentUsername = req.session.authUser.username;
    const profile = await getUserByUsername(username);
    const articles = (profile.role == 'writer') ? await getArticlesByWriterUsername(username) : null;

    res.render('profile/profile', {
        title: `Profile - ${profile.username}`,
        profile: profile,
        articles: articles,
        isOwnUser: username == currentUsername
    });
}

export const editProfile = async (req, res) => {
    const { id } = req.body;
    const user = req.body;
    await editUser(id, user);
    res.redirect("/");
}