import database from "../config/database.js";

export const createCategory = async (category) => {
    const result = await database("categories").insert(category);
    
    return result;
}

export const getAllCategory = async () => {
    const category = await database("categories").select("*");
    return category;
}

export const editCategory = async (id, category) => {
    const result = await database("categories").where("id", id).update(category);
    return result;
}

export const deleteCategory = async (id) => {
    const result = await database("categories").where("id", id).del();
    return result;
}
