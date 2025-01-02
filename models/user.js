import database from "../config/database.js";

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

export const getWriterByUsername = async (username) => {
    const result = await database("users").select("*").where("role", "writer").andWhere("username", username).first();
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
        const result = await database("users").where("id", id).update({ pending_premium: false, is_premium: true });
        return result;
    }
    else {
        const result = await database("users").where("id", id).update({ pending_premium: false });
        return result;
    }
}