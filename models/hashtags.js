import database from "../config/database.js";

export const createHashtags = async (hashtags) => {
    const result = await database("hashtags").insert(hashtags)
    return result;
}

export const getAllHashtags = async () => {
    const hashtags = await database("hashtags").select("*");
    return hashtags;
}

export const editHashtag = async (id, hashtag) => {
    const result = await database("hashtags").where("id", id).update(hashtag);
    return result;
}

export const deleteHashtag = async (id) => {
    const result = await database("hashtags").where("id", id).del();
    return result;
}