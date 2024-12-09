import { getUserByEmail,
         getUserByUsername,
         createUser
 } from "../models/user.js";
import { comparePassword,
         hashPassword} from "../utils/cryptography.js";

export const handleLogin = async (req, res) => {
    const user = req.body;
    const old_user = await getUserByEmail(user.email) || await getUserByUsername(user.email);
    if (!old_user) {
        res.render("auth/login", {
            title: "Đăng nhập",
            userNotFound: true
        });
    }
    else {
        const validity = await comparePassword(user.password, old_user.password);
        if (!validity) {
            res.render("auth/login", {
                title: "Đăng nhập",
                wrongPassword: true
            });
        }
        else {
            req.session.auth = true;
            req.session.authUser = {
                id: old_user.id,
                username: old_user.username,
                fullname: old_user.fullname,
                role: old_user.role
            };
            res.redirect("/");
        }
    }
}

export const handleLogout = async(req, res) => {
    req.session.auth = false;
    req.session.authUser = null;
    req.session.retUrl = null;
    res.redirect("/");
}
export const handleRegister = async (req, res) => {
    const user = req.body;
    user.role = "subscriber";
    const old_user = await getUserByEmail(user.email);
    const old_name = await getUserByUsername(user.username);

    if (old_user) {
        res.render("auth/register", {
            title: "Đăng ký",
            userExist: true
        });
    }
    else if (old_name) {
        res.render("auth/register", {
            title: "Đăng ký",
            userExist: true
        });
    }
    else {
        const hashedPassword = await hashPassword(user.password);
        user.password = hashedPassword;
        await createUser(user);
        res.redirect("/auth/login");
    }
}