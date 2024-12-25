import database from "../config/database.js";

export const getAllArticles = async (search = "", offset = 0, limit = 5) => {
    if (search) {
        return await database("articles").select("articles.*", "categories.name as category")
            .join("categories", "articles.category_id", "categories.id")
            .whereLike("title", `% ${search} %`)
            .orWhereLike("abstract", `% ${search} %`)
            .orWhereLike("content", `% ${search} %`)
            .offset(offset).limit(limit);
    }
    return await database("articles").select("articles.*", "categories.name as category")
        .join("categories", "articles.category_id", "categories.id")
        .offset(offset).limit(limit);
}

export const countArticles = async (search = "") => {
    let query = database("articles");

    if (search) {
        query = query.whereLike("title", `%${search}%`)
            .orWhereLike("abstract", `%${search}%`)
            .orWhereLike("content", `%${search}%`);
    }

    const result = await query.count("* as total").first();
    return result.total;
};

export const countDraftArticles = async (search = "") => {
    let query = database("articles");

    if (search) {
        query = query.whereLike("title", `%${search}%`)
            .orWhereLike("abstract", `%${search}%`)
            .orWhereLike("content", `%${search}%`);
    }

    const result = await query.count("* as total").where("status", "draft").first();
    return result.total;
};

export const createArticle = async (article) => {
    const result = await database("articles").insert(article);
    return result;
}
export const getArticleById = async (id) => {
    return await database("articles").where("id", id).first();
}

export const deleteArticleById = async (id) => {
    await database("articles").where("id", id).del();
}

export const updateArticleById = async (id, article) => {
    const result = await database("articles").where("id", id).update(article);
    return result;
}

export const updateArticleHashtag = async (id, hashtag) => {
    const result = await database("article_tag").where("article_id", id).update(hashtag);
    return result;
}

export const getArticleBySlug = async (slug) => {
    //Select * from articles where slug = slug
    const article = await database("articles").where({ slug: slug }).first();
    return article;
}

export const getArticleInfoById = async (id) => {
    return await database("articles")
        .select(
            "articles.*",
            "categories.id as category_id",
            "categories.name as category_name",
            "category_groups.id as group_id",
            "category_groups.name as group_name",
            "users.id as author_id",
            "users.fullname as author_name"
        )
        .join("categories", "articles.category_id", "categories.id")
        .join("category_groups", "categories.group_id", "category_groups.id")
        .join("users", "articles.author_id", "users.id")
        .where("articles.id", id)
        .first();
}

export const getArticleByEditors = async (searchTerm = "", limit, offset) => {
    const result =  await database("articles")
                .select(
                    "articles.*",
                    "hashtags.tag_name as hashtags",
                    "users.fullname as fullname",
                    "categories.name as category",
                )
                .join("users", "articles.editor_id", "users.id")
                .join("article_tag", "articles.id", "article_tag.article_id")
                .join("hashtags", "article_tag.tag_id", "hashtags.id")
                .leftJoin("categories", "articles.category_id", "categories.id")
                .where(builder => {  
                    builder  
                        .where("articles.status", "draft")  
                        .andWhere(subBuilder => {  
                            subBuilder  
                                .whereLike("articles.abstract", `%${searchTerm}%`)  
                                .orWhereLike("users.fullname", `%${searchTerm}%`)  
                        });  
                })  
                .offset(offset)
                .limit(limit);
    return result;
}

export const getArticlesByCategory = async (category_id, current_article_id, limit = 5) => {
    return await database("articles")
        .select("articles.*", "categories.name as category_name")
        .join("categories", "articles.category_id", "categories.id")
        .where("articles.category_id", category_id)
        .andWhere("articles.id", "!=", current_article_id)
        .limit(limit)

};

export const addComment = async (comment) => {
    const result = await database("comment").insert(comment);
    return result;
};

export const getCommentsByArticleId = async (article_id) => {
    return await database("comment")
        .select("guest_name as author_name", "content", "created_at")
        .where("article_id", article_id)
        .orderBy("created_at", "desc");
};

export const getHashtagsByArticleId = async (article_id) => {
    return await database("hashtags")
        .select("hashtags.id", "hashtags.tag_name as name")
        .join("article_tag", "hashtags.id", "article_tag.tag_id")
        .where("article_tag.article_id", article_id);
};

export const fullTextSearchArticles = async (searchQuery, categoryGroup, category, k, s) => {
    // k is limit and s is offset
    try {
        if (k === undefined || s === undefined) {
            k = total;
            s = 0;
        }
        let results, count;
        if (searchQuery === "") {
            count = await database('articles')
                .whereRaw("to_tsvector('simple', title || ' ' || abstract || ' ' || content) @@ plainto_tsquery('simple', ?)", [searchQuery])
                .count("* as total").first();
            results = await database('articles')
                .select(
                    "articles.*",
                    "categories.id as category_id",
                    "categories.name as category_name",
                    "category_groups.id as group_id",
                    "category_groups.name as group_name",
                    "users.id as author_id",
                    "users.fullname as author_name"
                )
                .join("categories", "articles.category_id", "categories.id")
                .join("category_groups", "categories.group_id", "category_groups.id")
                .join("users", "articles.author_id", "users.id")
                .where("category_groups.name", categoryGroup)
                .andWhere("categories.name", category)
                .limit(k).offset(s);
        }
        else {
            count = await database('articles')
                .whereRaw("to_tsvector('simple', title || ' ' || abstract || ' ' || content) @@ plainto_tsquery('simple', ?)", [searchQuery])
                .count("* as total").first();
            results = await database('articles')
                .select(
                    "articles.*",
                    "categories.id as category_id",
                    "categories.name as category_name",
                    "category_groups.id as group_id",
                    "category_groups.name as group_name",
                    "users.id as author_id",
                    "users.fullname as author_name"
                )
                .whereRaw("to_tsvector('simple', title || ' ' || abstract || ' ' || content) @@ plainto_tsquery('simple', ?)", [searchQuery])
                .join("categories", "articles.category_id", "categories.id")
                .join("category_groups", "categories.group_id", "category_groups.id")
                .join("users", "articles.author_id", "users.id")
                .where("category_groups.name", categoryGroup)
                .andWhere("categories.name", category)
                .limit(k).offset(s);
        }
        return { total: count.total, results: results }
    } catch (error) {
        console.error('Error searching articles:', error);
        throw error;
    }
};
