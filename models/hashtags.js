import database from "../config/database.js";

export const createHashtags = async (hashtags) => {
    const result = await database("hashtags").insert(hashtags)
    return result;
}

export const getAllHashtags = async (limit, offset) => {
    const hashtags = await database("hashtags").select("*").limit(limit).offset(offset);
    return hashtags;
}

export const countHashtags = async () => {
    const result = await database("hashtags").count("* as total").first();
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