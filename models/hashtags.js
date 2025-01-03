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

export const getHashtagID = async (hashtag) => {
    const result = await database("hashtags").select("id").where("tag_name", hashtag).first();
    return result;
}

export const countHashtagArticles = async (id) => {
    const result = await database("article_tag").where("tag_id", id).join("articles", "article_id", "articles.id").andWhere("articles.status", "published").count("* as total").first();
    return result;
}

export const getHashtagByID = async (id) => {
    const result = await database("hashtags").select("*").where("id", id).first();
    return result;
}

export const searchHashtagArticles = async (id, limit, offset) => {
    const article_id = await database("article_tag").select("article_id as id").where("tag_id", id).limit(limit).offset(offset);
    const article_ids = article_id.map(item => item.id);

    const result = await database("articles")
                .select(
                    "articles.*",
                    "categories.name as category_name",
                    "categories.description as category_description",
                    database.raw("json_agg(json_build_object('id', hashtags.id, 'tag_name', hashtags.tag_name)) as hashtags")
                )
                .join("categories", "articles.category_id", "categories.id")
                .join("article_tag", "articles.id", "article_tag.article_id")
                .join("hashtags", "article_tag.tag_id", "hashtags.id")
                .whereIn("articles.id", article_ids)
                .andWhere("articles.status", "published") // Ensure only published articles
                .groupBy(
                    "articles.id",
                    "categories.name",
                    "categories.description"
                ) // Group by unique columns
                .orderByRaw('is_premium DESC, articles.published_at DESC') // Sort by premium first, then newest
                .limit(limit)
                .offset(offset);
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
