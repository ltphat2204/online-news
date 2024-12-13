import { getUserByEmail,
    getUserByUsername,
    createUser
} from "../models/user.js";
import { comparePassword,
    hashPassword} from "../utils/cryptography.js";
import { getSocialNetworkByUserId } from "../models/social_network.js";

export const handleLogin = async (req, res) => {
    const user = req.body;
    const old_user = await getUserByEmail(user.email) || await getUserByUsername(user.email);

    if (!old_user) {
        res.render("auth/login", {
            title: "Đăng nhập",
            userNotFound: true
        });
        return;
    }

    if (old_user.password) {
        const validity = await comparePassword(user.password, old_user.password);
        if (!validity) {
            res.render("auth/login", {
                title: "Đăng nhập",
                wrongPassword: true
            });
            return;
        }
    } else {
        const socialNetwork = await getSocialNetworkByUserId(old_user.id);
        if (!socialNetwork) {
            res.render("auth/login", {
                title: "Đăng nhập",
                error: "Tài khoản chưa được thiết lập mật khẩu hoặc liên kết mạng xã hội."
            });
            return;
        } else {
            res.render("auth/login", {
                title: "Đăng nhập",
                socialLogin: true,
                provider: socialNetwork.provider
            });
            return;
        }
    }
    
    req.session.auth = true;
    req.session.authUser = {
        id: old_user.id,
        username: old_user.username,
        fullname: old_user.fullname,
        role: old_user.role
    };
    res.redirect("/");
}

export const handleLogout = async (req, res) => {
    req.logout(function(err) {
        if (err) {
          console.error(err);
          return res.status(500).send("Error during logout");
        }
        
        req.session.destroy(function(err) {
          if (err) {
            console.error(err);
            return res.status(500).send("Error destroying session");
          }
          
          res.redirect('/');
        });
      });
}

export const handleRegister = async (req, res) => {
    const user = req.body;
    user.role = "subscriber";
    const hashedPassword = await hashPassword(user.password);
    user.password = hashedPassword;
    await createUser(user);
    res.redirect("/auth/login");
}

export const checkAvailable = async (req, res) => {
    const user = req.query.username;
    const email = req.query.email;

    const old_name = await getUserByUsername(user);
    const old_email = await getUserByEmail(email);

    const response = {
        userExist: !old_name,
        emailExist: !old_email
    }

    return res.json(response);
}
