import database from "../config/database.js";

export const createCategoryGroup = async (categoryGroup) => {
    const result = await database("category_groups").insert(categoryGroup);
    return result;
}

export const getAllCategoryGroups = async () => {
    const categoryGroups = await database("category_groups").select("*");
    return categoryGroups;
}

export const editCategoryGroup = async (id, categoryGroup) => {
    const result = await database("category_groups").where("id", id).update(categoryGroup);
    return result;
}

export const deleteCategoryGroup = async (id) => {
    const result = await database("category_groups").where("id", id).del();
    return result;
}

export const getCategoryGroupById = async (id) => { // Ensure function name is correct
    const categoryGroup = await database("category_groups").where("id", id).first();
    const categories = await database("categories").where("group_id", id);
    return { ...categoryGroup, categories };
}