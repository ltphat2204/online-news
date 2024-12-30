import database from "../config/database.js";

export const createHashtags = async (hashtags) => {
    const result = await database("hashtags").insert(hashtags).returning("id");
    return result;
}

export const searchHashtags = async (searchTerm = "", limit, offset) => {
    const hashtags = await database("hashtags").select("*").where("tag_name", "like", `%${searchTerm}%`).limit(limit).offset(offset);
    return hashtags;
}
export const countHashtags = async (searchTerm = "") => {
    const result = await database("hashtags").where("tag_name","like",`%${searchTerm}%`).count("* as total").first();
    return result;
}

export const editHashtag = async (id, hashtag) => {
    const result = await database("hashtags").where("id", id).update(hashtag);
    return result;
}

export const deleteHashtag = async (id) => {
    const result = await database("hashtags").where("id", id).del();
    return result;
}

export const getAllHashtags = async () => {
    const result = await database("hashtags").select("*");
    return result;
};

export const addArticleTag = async (articleId, tagId) => {
    const result = await database("article_tag").insert({ article_id: articleId, tag_id: tagId });
    return result;
};