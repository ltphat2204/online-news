import { getArticlesByWriterUsername } from "../models/articles.js";
import { getUserByUsername, editUser, getUserById } from "../models/user.js";
import { comparePassword, hashPassword} from "../utils/cryptography.js";

export const viewProfile = async (req, res) => {
    const { username } = req.params;

    if (!username || !req.session.authUser) {
        res.redirect('/');
        return;
    }

    const currentUsername = req.session.authUser.username;
    const profile = await getUserByUsername(username);
    const articles = (profile.role == 'writer') ? await getArticlesByWriterUsername(username) : null;

    res.render('profile/profile',  {
        title: `Profile - ${profile.username}`,
        profile: profile,
        articles: articles,
        isOwnUser: username == currentUsername
    });
}

export const editProfile = async (req, res) => {
    const { id, fullname, pen_name, password } = req.body;
    
    const hashedPassword = await hashPassword(password);
    const newUser = {
        id: id,
        fullname: fullname,
        pen_name: pen_name,
        password: hashedPassword
    };
    await editUser(id, newUser);
    res.redirect("/");
}

export const verifyPassword = async (req, res) => {
    const { id, old_password } = req.body;
    const currentUser = await getUserById(id);

    const hashedPassword = hashPassword(old_password);
    const isValid = await comparePassword(currentUser.password, hashedPassword);
    return res.json(isValid);
}