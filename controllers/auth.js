import { getUserByEmail, getUserByUsername, createUser } from "../models/user.js";
import { comparePassword, hashPassword } from "../utils/cryptography.js";
import { getSocialNetworkByUserId } from "../models/social_network.js";
import { sendOTP } from "../utils/mailSender.js";
import { numberHelpers } from "../utils/numberHelpers.js";
import { editUser } from "../models/user.js";

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
    req.logout(function (err) {
        if (err) {
            console.error(err);
            return res.status(500).send("Error during logout");
        }

        req.session.destroy(function (err) {
            if (err) {
                console.error(err);
                return res.status(500).send("Error destroying session");
            }

            res.redirect('/');
        });
    });
}

export const handleRegister = async (req, res) => {
    var user = {};
    user.email = req.body.email;
    user.username = req.body.username;
    user.fullname = req.body.fullname;
    user.password = req.body.password;
    user.role = "subscriber";
    const hashedPassword = await hashPassword(user.password);
    user.password = hashedPassword;
    await createUser(user);
    res.redirect("/auth/login");
};

export const checkAvailable = async (req, res) => {
    const SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
    const token = req.query.token;
    
    try {
        // Xác minh reCAPTCHA token
        const response = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `secret=${SECRET_KEY}&response=${token}`,
        });
        const result = await response.json();
        if (result.success && result.score >= 0.5) {
            // Token hợp lệ, tiếp tục xử lý đăng ký
            const user = req.query.username;
            const email = req.query.email;

            const old_name = await getUserByUsername(user);
            const old_email = await getUserByEmail(email);

            const response = {
                userExist: !old_name,
                emailExist: !old_email
            }

            return res.json(response);
        } else {
            res.status(400).send('reCAPTCHA không hợp lệ.');
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Lỗi khi xác minh reCAPTCHA.');
    }
}

export const handleForgotPassword = async (req, res) => {
    const user = req.body;

    if (user.otp) {
        if (parseInt(user.otp) !== parseInt(user.realotp)) {
            res.render("auth/forgotPassword", {
                title: "Sai mã OTP",
                user: user,
                userFound: true,
                wrongOTP: true,
                otp: user.realotp,
            });
            return;
        }
        else {
            res.render("auth/changePassword", { 
                title: "Đổi mật khẩu",
                // fromTo: "forgotPassword",
                email: user.email
            });
        }
    }
    else {
        const old_user = await getUserByEmail(user.email);

        if (!old_user) {
            res.render("auth/forgotPassword", {
                title: "Quên mật khẩu",
                userNotFound: true
            });
            return;
        }
        else {
            const otp = numberHelpers.generateOTP(6);
            await sendOTP(user.email, otp);
    
            res.render("auth/forgotPassword", {
                title: "Quên mật khẩu",
                otp: otp,
                user: old_user,
                userFound: true
            });
            return;
        }
    }
}

export const handleChangePassword = async (req, res) => {
    const user = await getUserByEmail(req.body.email);
    const hashedPassword = await hashPassword(req.body.newPassword);

    const newUser = {
        id: user.id,
        fullname: user.fullname,
        pen_name: user.pen_name,
        password: hashedPassword
    };

    try {
        await editUser(user.id, newUser);
        res.status(200).json({ success: true, message: 'Đổi mật khẩu thành công' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: 'Đã xảy ra lỗi không mong muốn' });
    }
}