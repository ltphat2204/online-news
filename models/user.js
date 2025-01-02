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

export const countEditors = async (searchTerm = "") => {
    const result = await database("users").where("role", "editor").andWhere("fullname", "like", `%${searchTerm}%`).count("* as total").first();
    return result;
}