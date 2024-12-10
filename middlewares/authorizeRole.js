import { authUserById } from "../controllers/user.js";
const authorizeRole = (allowedRoles) => {
    return async function (req, res, next) {
        if (req.session.authUser === undefined) {
            res.redirect("/auth/login");
            return;
        }
        const id = req.session.authUser.id;
        try {
            if (!Array.isArray(allowedRoles)) {
                throw new Error("allowedRoles must be an array");
            }
            const user = await authUserById(id);
            if (!allowedRoles.includes(user.role)) {
                res.redirect("/");
            } else {
                next();
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            res.status(500).send("Internal Server Error");
            return;
        }
    };
}

export default authorizeRole;