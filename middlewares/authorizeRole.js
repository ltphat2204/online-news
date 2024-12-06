// import { getUserById } from "../controllers/user";
const authorizeRole = (allowedRoles) =>{
    return function(req, res, next) {
        const userRole = req.session.user.role;
        
        if (allowedRoles.includes(userRole)) {
            next();
        } else {
            res.status(403).send('You do not have permission to access this page');
        }
    };
}

export default authorizeRole;