import database from "../config/database.js";

export const createUser = async (user) => {
    const result = await database("users").insert(user);
    return result;
}

export const getAllUsers = async () => {
    const users = await database("users").select("*");
    return users;
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