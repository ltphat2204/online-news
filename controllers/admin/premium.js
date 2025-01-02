import { getPendingPremiumUser, approveUserPremium } from "../../models/user.js";

export const getPendingPremiumUserController = async (req, res) => {
    const query = req.query.query || "";
    const limit = req.query.limit ? parseInt(req.query.limit) : 5;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const offset = page ? (page - 1) * limit : 0;
    
    const data = await getPendingPremiumUser(query, limit, offset);
    const totalPages = Math.ceil(data.total / limit);
    res.render('admin/premium', {
        title: 'Danh sách người dùng đăng ký Premium',
        users: data.results,
        empty: data.total === 0,
        pagination:{
            totalPages,
            currentPage: page,
            limit,
            total: data.total,
        }
    });
}

export const responsePremium = async (req, res) => {
    const { id } = req.body;
    const { action } = req.body;
    try {
        const result = await approveUserPremium(id, action);
        res.json({ success: true, message: 'Thao tác thành công' });
    } catch (error) {
        console.error(`Error approving premium user with id ${id}:`, error);
        res.status(500).send('Internal Server Error');
    }
}