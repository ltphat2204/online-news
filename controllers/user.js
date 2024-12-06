import {
    getAllUsers,
    getTotalUsersCount,
    createUser,
    editUser,
    deleteUser,
    searchUsersByKey
} from "../models/user.js";

// Hàm lấy người dùng với phân trang
export const getUsers = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 5; // Số người dùng mỗi trang
    const offset = (page - 1) * limit;

    const users = await getAllUsers(limit, offset);
    const totalUsersCount = await getTotalUsersCount();
    const totalPages = Math.ceil(totalUsersCount / limit);

    // Nếu không có người dùng
    if (users.length === 0) {
        return res.render('admin/user', {
            title: 'Người dùng',
            empty: true,
            users: [],
            error: 'Hiện không có người dùng nào.',
            totalPages: 0,
            currentPage: page,
            limit: limit,
            query: null
        });
    }

    // Xử lý trạng thái 'is_blocked' và 'is_premium' trước khi gửi lên view
    const usersWithStatus = users.map(user => {
        return {
            ...user,
            isBlocked: user.is_blocked ? "Có" : "Không", // Chuyển đổi trạng thái bị chặn
            isPremium: user.is_premium ? "Có" : "Không"  // Chuyển đổi trạng thái premium
        };
    });

    // Render ra view với phân trang
    res.render('admin/user', {
        title: 'Người dùng',
        empty: false,
        users: usersWithStatus,
        totalPages: totalPages,
        currentPage: page,
        limit: limit,
        query: null
    });
}
export const searchUsers = async (req, res) => {
    const { query } = req.query;

    // Nếu không có query (tức người dùng không nhập gì), chuyển hướng về trang full dữ liệu
    if (!query || query.trim() === "") {
        return res.redirect('/admin/user');  // Quay lại trang đầy đủ người dùng
    }

    const page = parseInt(req.query.page) || 1;
    const limit = 5; // Số người dùng mỗi trang
    const offset = (page - 1) * limit;

    const users = await searchUsersByKey(query, limit, offset);
    const totalUsersCount = await getTotalUsersCount(query);
    const totalPages = Math.ceil(totalUsersCount / limit);
    
    const usersWithStatus = users.map(user => {
        return {
            ...user,
            isBlocked: user.is_blocked ? "Có" : "Không", 
            isPremium: user.is_premium ? "Có" : "Không"  
        };
    });
    // Nếu không tìm thấy người dùng nào khớp với từ khóa
    if (users.length === 0) {
        return res.render('admin/user', {
            title: 'Người dùng',
            empty: false,  // Có dữ liệu, nhưng không khớp với từ khóa
            users: usersWithStatus,
            error: 'Không tìm thấy người dùng nào trùng khớp.',
            totalPages: 0,
            currentPage: page,
            limit: limit,
            query: query
        });
    }

    res.render('admin/user', {
        title: 'Người dùng',
        empty: false,
        users: usersWithStatus,
        totalPages: totalPages,
        currentPage: page,
        limit: limit,
        query: query 
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
    if (!user.is_blocked) {
        user.is_blocked = false;
    } else {
        user.is_blocked = true;
    }
    if (!user.is_blocked) {
        user.is_blocked = false;
    } else {
        user.is_blocked = true;
    }
    await editUser(id, user);
    res.redirect('/admin/user');
}

export const deleteUserById = async (req, res) => {
    const { id } = req.body;
    await deleteUser(id);

    res.redirect('/admin/user');
}

