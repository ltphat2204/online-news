import database from "../config/database.js";

export const createCategory = async (category) => {
    const result = await database("categories").insert(category);
    return result;
}

export const getAllCategories = async () => {
    const categories = await database("categories")
                            .select("categories.id", "categories.name", "categories.group_id", "category_groups.name as group_name", "categories.description")
                            .join("category_groups", "categories.group_id", "category_groups.id");
    return categories;
}

export const editCategory = async (id, category) => {
    const result = await database("categories").where("id", id).update(category);
    return result;
}

export const deleteCategory = async (id) => {
    const result = await database("categories").where("id", id).del();
    return result;
}

// get k row from offset s (first row is 0)
export const getKCategoryFromS = async(k,s) =>{
    const result = await database("categories").select("*").limit(k).offset(s);
    return result;
}
