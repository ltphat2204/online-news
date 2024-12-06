import { authUserById } from "../controllers/user.js";
const authorizeRole = (allowedRoles) =>{
    return async function(req, res, next) {
        const id = req.session.authUser.id;
        const user = await authUserById(id);
        if (allowedRoles.includes(user.role)) {
            next();
        } else {
            res.redirect("/");
        }
    };
}

export default authorizeRole;