import database from "../config/database.js";
import { dateHelpers } from "../utils/dateHelpers.js";
import moment from 'moment';
import 'moment/locale/vi.js';
// Lấy tất cả người dùng
export const getAllUsers = async (limit, offset) => {
    const users = await database("users")
        .select("*")
        .limit(limit)
        .offset(offset);
    return users;
}

// Lấy tổng số người dùng để tính toán số trang
export const getTotalUsersCount = async (query = null) => {
    let countQuery = database("users").count("id as count").first();
    if (query) {
        countQuery = countQuery
            .where('fullname', 'like', `%${query}%`)
            .orWhere('username', 'like', `%${query}%`);
    }
    const result = await countQuery;
    return result.count;
};

export const searchUsersByKey = async (query, limit, offset) => {
    const users = await database("users")
        .select("*")
        .where('fullname', 'like', `%${query}%`)
        .orWhere('username', 'like', `%${query}%`)
        .limit(limit)
        .offset(offset);
    return users;
}

export const createUser = async (user) => {
    const result = await database("users").insert(user);
    return result;
}

export const editUser = async (id, user) => {
    const result = await database("users").where("id", id).update(user);
    return result;
}

export const deleteUser = async (id) => {
    const result = await database("users").where("id", id).del();
    return result;
}

export const getUserByEmail = async (email) => {
    const result = await database("users").select("*").where("email", email).first();
    return result;
}

export const getUserByUsername = async (username) => {
    const result = await database("users").select("*").where("username", username).first();
    return result;
}

export const getUserById = async (id) => {
    const result = await database("users").select("*").where("id", id).first();
    return result;
}

export const getEditorByUsername = async (username) => {
    const result = await database("users").select("id").where("username", username).first();
    return result;
}

export const getEditors = async (searchTerm = "", limit, offset) => {
    const result = await database("users").select("*").where("role", "editor").andWhere("fullname", "like", `%${searchTerm}%`).limit(limit).offset(offset);
    return result;
}

export const countEditors = async (searchTerm = "") => {
    const result = await database("users").where("role", "editor").andWhere("fullname", "like", `%${searchTerm}%`).count("* as total").first();
    return result;
}

export const getPendingPremiumUser = async (query,limit, offset) => {
    if (!query){
        const count = await database("users")
                            .where("pending_premium", true)
                            .andWhere("is_premium", false)
                            .count("* as total").first();
        const results = await database("users").select("*")
                            .where("pending_premium", true)
                            .andWhere("is_premium", false)
                            .limit(limit).offset(offset);
        return { total: count.total, results };
    }
    else{
        const count = await database("users")
                            .where("pending_premium", true)
                            .andWhere("is_premium", false)
                            .andWhere("fullname", "like", `%${query}%`)
                            .count("* as total").first();
        const results = await database("users").select("*")
                            .where("pending_premium", true)
                            .andWhere("is_premium", false)
                            .andWhere("fullname", "like", `%${query}%`)
                            .limit(limit).offset(offset);
        return { total: count.total, results };
    }
}

export const approveUserPremium = async (id, action) => {
    if (action === "approve") {
        // Lấy giá trị premium_extension_minutes từ cơ sở dữ liệu
        const premium_extension_time = await database("settings")
            .select("*")
            .first()
            .then((settings) => settings.premium_extension_minutes);
        // Thiết lập locale và tính toán ngày hết hạn premium
        moment.locale('vi');
        const premium_expired = moment().utc()
            .add(premium_extension_time, 'minutes')
        const result = await database("users").where("id", id).update({ pending_premium: false, is_premium: true, premium_expired: premium_expired });
        return result;
    }
    else {
        const result = await database("users").where("id", id).update({ pending_premium: false });
        return result;
    }
}

export const setPendingPremiumStatus = async (id) => {
    const result = await database("users").where("id", id).update({ pending_premium: true });
    return result;
}