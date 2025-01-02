import database from "../config/database.js";

export const getEditorCategories = async (editorId) => {
    return await database("editor_category").where("editor_id", editorId).select("category_id");
};
