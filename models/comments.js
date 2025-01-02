import database from "../config/database.js";

export const createComment = async (content, guest_name, article_id, author_id) => {
    if (author_id) {
        await database("comment").insert({ content, author_id, article_id, guest_name });
    }
    else {
        await database("comment").insert({ content, guest_name, article_id });
    }
}