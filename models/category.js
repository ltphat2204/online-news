import database from "../config/database.js";

export const createCategory = async (category) => {
    const result = await database("categories").insert(category);
    return result;
}

export const getAllCategories = async (category_group) => {
    const query = database("categories")
                .select("categories.id", "categories.name", "categories.group_id", "category_groups.name as group_name", "categories.description")
                .join("category_groups", "categories.group_id", "category_groups.id");
    if (category_group) {
        query.where("categories.group_id", category_group);
    }
    const categories = await query;
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
export const getCategoriesWithPagination = async(k,s) =>{
    try 
    {
        // Validate inputs
        if (!Number.isInteger(k) || k < 0 || !Number.isInteger(s) || s < 0) {
            throw new Error("Invalid input: 'k' and 's' must be non-negative integers.");
        }
    const result = await database("categories")
                            .select("categories.id", "categories.name", "categories.group_id", "category_groups.name as group_name", "categories.description")
                            .join("category_groups", "categories.group_id", "category_groups.id")
                            .limit(k).offset(s);
    return result;
    } 
    catch (error) 
    {
        console.error("Error fetching categories:", error);
        throw error; // Re-throw error for the caller to handle
    }
}


export const countCategories = async () => {
    const result = await database("categories").count('* as total').first();
    return result;
}

export const countSearchCategories = async (search) => {
    const result = await database("categories")
                            .where("name", "like", `%${search}%`)
                            .count('* as total')
                            .first();
    return result;
}

export const getCategoryById = async (id) => {
    const result = await database("categories").where("id", id).first();
    return result;
}

export const searchCategoryByName = async(search, k, s) => {
    const result = await database("categories")
                            .select("categories.id", "categories.name", "categories.group_id", "category_groups.name as group_name", "categories.description")
                            .join("category_groups", "categories.group_id", "category_groups.id")
                            .where("categories.name", "like", `%${search}%`)
                            .limit(k).offset(s);
    return result;
}


export const searchCategoryByEditors = async(editor) => {
    const result = await database("editor_category")
                        .join("categories", "editor_category.category_id", "=", "categories.id")
                        .select("categories.name", "editor_category.category_id")
                        .where("editor_category.editor_id", editor);
    return result;
}

export const removeCategoryByEditors = async(id) => {
    const result = await database("editor_category").where('editor_id', id).del();
    return result;
}

export const insertCategoryByEditors = async(dataList) => {
    const result = await database("editor_category").insert(dataList);
    return result;
}

export const getCategoryByCategoryGroup = async (name) => {
    const result = await database("categories")
                            .select("categories.id", "categories.name", "categories.group_id", "category_groups.name as group_name", "categories.description")  
                            .join("category_groups", "categories.group_id", "category_groups.id")
                            .where("category_groups.name", name);
    return result;
}