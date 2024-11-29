import {
    getAllUsers,
    createUser,
    editUser,
    deleteUser
} from "../models/user.js";

export const getUsers = async (req, res) => {
    const users = await getAllUsers();

    res.render('admin/user', {
        title: 'Người dùng',
        empty: users.length === 0,
        users
    });
}

export const postUsers = async (req, res) => {
    const user = req.body;
    if (!user.dob) {
        user.dob = null;
    }
    if (!user.is_premium) {
        user.is_premium = false;
    } else {
        user.is_premium = true;
    }
    if (!user.premium_expired) {
        user.premium_expired = null;
    }
    await createUser(user);
    res.redirect('/admin/user');
}

export const patchUser = async (req, res) => {
    const { id, username, email } = req.body;
    const user = req.body;
    if (!user.dob) {
        user.dob = null;
    }
    if (!user.is_premium) {
        user.is_premium = false;
    } else {
        user.is_premium = true;
    }
    if (!user.premium_expired) {
        user.premium_expired = null;
    }
    await editUser(id, user);
    res.redirect('/admin/user');
}

export const deleteUserById = async (req, res) => {
    const { id } = req.body;
    await deleteUser(id);

    res.redirect('/admin/user');
}