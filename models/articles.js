import database from "../config/database.js";
import { createHashtags, addArticleTag } from "./hashtags.js";
import { getEditorCategories } from "./editor_category.js";

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
    const result = await database("articles").insert(article).returning("id");
    return result;
}
export const getArticleById = async (id) => {
    return await database("articles").where("id", id).first();
}

export const deleteArticleById = async (id) => {
    await database("article_tag").where("article_id", id).del();
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
                .join("editor_category", "articles.category_id", "editor_category.category_id")
                .join("users", "editor_category.editor_id", "users.id")
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

export const getArticlesByWriterUsername = async (username) => {
    const result = await database("articles").select("articles.title", "articles.id")
                                        .join("users", "users.id", "articles.author_id")
                                        .where("users.username", username);
    return result;
}

export const increaseArticleViewCount = async (articleId) => {
    const result = await database.raw('SELECT increment_view_count(?) AS view', [articleId]);
    return result.rows[0].view;
}

export const getArticlesByCategory = async (category_id, current_article_id, limit = 5) => {
    return await database("articles")
        .select("articles.*", "categories.name as category_name")
        .join("categories", "articles.category_id", "categories.id")
        .where("articles.category_id", category_id)
        .andWhere("articles.id", "!=", current_article_id)
        .orderBy(database.raw('RANDOM()'))
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
    try {
        if (k === undefined || s === undefined) {
            k = 5; // Default limit
            s = 0;  // Default offset
        }

        let results, count;
      
        // Conditions for categoryGroup and category filters
        const categoryGroupCondition = categoryGroup ? "category_groups.name" : null;
        const categoryCondition = category ? "categories.name" : null;

        if (searchQuery === "") {
            // Count total articles without search query
            count = await database("articles")
                .join("categories", "articles.category_id", "categories.id")
                .join("category_groups", "categories.group_id", "category_groups.id")
                .modify((queryBuilder) => {
                    if (categoryGroupCondition) {
                        queryBuilder.where(categoryGroupCondition, categoryGroup);
                    }
                    if (categoryCondition) {
                        queryBuilder.andWhere(categoryCondition, category);
                    }
                })
                .andWhere("articles.status", "published") // Ensure only published articles
                .count("* as total")
                .first();

            // Fetch articles without search query
            results = await database("articles")
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
                .modify((queryBuilder) => {
                    if (categoryGroupCondition) {
                        queryBuilder.where(categoryGroupCondition, categoryGroup);
                    }
                    if (categoryCondition) {
                        queryBuilder.andWhere(categoryCondition, category);
                    }
                })
                .andWhere("articles.status", "published") // Ensure only published articles
                .orderByRaw('is_premium DESC, articles.published_at DESC') // Sort by premium first, then newest
                .limit(k)
                .offset(s);
        } else {
            // Count total articles with search query
            count = await database("articles")
                .join("categories", "articles.category_id", "categories.id")
                .join("category_groups", "categories.group_id", "category_groups.id")
                .modify((queryBuilder) => {
                    queryBuilder.where(function () {
                        this.whereRaw(
                            "search_vector @@ plainto_tsquery('vietnamese', immutable_unaccent(?))",
                            [searchQuery]
                        )
                        .orWhereRaw("immutable_unaccent(title) ILIKE ?", [`%${searchQuery}%`])
                        .orWhereRaw("immutable_unaccent(abstract) ILIKE ?", [`%${searchQuery}%`])
                        .orWhereRaw("immutable_unaccent(content) ILIKE ?", [`%${searchQuery}%`]);
                    });
                    if (categoryGroupCondition) {
                        queryBuilder.andWhere(categoryGroupCondition, categoryGroup);
                    }
                    if (categoryCondition) {
                        queryBuilder.andWhere(categoryCondition, category);
                    }
                })
                .andWhere("articles.status", "published") // Ensure only published articles
                .count("* as total")
                .first();

            // Fetch articles with search query
            results = await database("articles")
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
                .modify((queryBuilder) => {
                    queryBuilder.where(function () {
                        this.whereRaw(
                            "search_vector @@ plainto_tsquery('vietnamese', immutable_unaccent(?))",
                            [searchQuery]
                        )
                        .orWhereRaw("immutable_unaccent(title) ILIKE ?", [`%${searchQuery}%`])
                        .orWhereRaw("immutable_unaccent(abstract) ILIKE ?", [`%${searchQuery}%`])
                        .orWhereRaw("immutable_unaccent(content) ILIKE ?", [`%${searchQuery}%`]);
                    });
                    if (categoryGroupCondition) {
                        queryBuilder.andWhere(categoryGroupCondition, categoryGroup);
                    }
                    if (categoryCondition) {
                        queryBuilder.andWhere(categoryCondition, category);
                    }
                })
                .andWhere("articles.status", "published") // Ensure only published articles
                .orderByRaw('is_premium DESC, articles.published_at DESC') // Sort by premium first, then newest
                .limit(k)
                .offset(s);
        }

        // Return results
        return { total: count.total, results };
    } catch (error) {
        console.error("Error searching articles:", error);
        throw error;
    }
};




export const getArticlesByCategoryID = async (id, k, s) => {
    try {
        if (k === undefined || s === undefined) {
            k = 5; // Default limit
            s = 0;  // Default offset
        }

        // Count total articles by category ID
        const count = await database("articles")
            .join("categories", "articles.category_id", "categories.id")
            .where("categories.id", id)
            .andWhere("articles.status", "published") // Ensure only published articles
            .count("* as total")
            .first();

        // Fetch articles by category ID
        const articles = await database("articles")
            .select(
                "articles.*",
                "categories.name as category_name",
                "categories.description as category_description"
            )
            .join("categories", "articles.category_id", "categories.id")
            .where("categories.id", id)
            .andWhere("articles.status", "published") // Ensure only published articles
            .orderByRaw('is_premium DESC, articles.published_at DESC') // Sort by premium first, then newest
            .limit(k)
            .offset(s);

        // Return total count and articles
        return { total: count.total, articles };
    } catch (error) {
        console.error("Error fetching articles by category ID:", error);
        
        throw error;
    }
};

export const addArticleHashtags = async (articleId, hashtags) => {
    const existingHashtags = hashtags.filter(tag => !tag.startsWith('new-'));
    const newHashtags = hashtags.filter(tag => tag.startsWith('new-')).map(tag => ({ tag_name: tag.replace('new-', '') }));

    // Insert new hashtags into the database and retrieve their IDs
    const newHashtagIds = [];
    for (const newTag of newHashtags) {
        const [result] = await createHashtags([newTag]);
        newHashtagIds.push(result[0].id);
    }

    // Combine existing and new hashtag IDs
    const allHashtagIds = [...existingHashtags, ...newHashtagIds];

    // Insert into the article_tag table
    for (const tagId of allHashtagIds) {
        await addArticleTag(articleId, tagId);
    }
};

export const getArticlesByAuthor = async (authorId, search = "", offset = 0, limit = 5) => {
    let query = database("articles")
        .select("articles.*", "categories.name as category")
        .join("categories", "articles.category_id", "categories.id")
        .where("articles.author_id", authorId);

    if (search) {
        query = query.andWhere(builder => {
            builder.whereLike("title", `%${search}%`)
                .orWhereLike("abstract", `%${search}%`)
                .orWhereLike("content", `%${search}%`);
        });
    }

    return await query.offset(offset).limit(limit);
};

export const getArticlesByCategoryIds = async (categoryIds, search = "", offset = 0, limit = 5) => {
    let query = database("articles")
        .select("articles.*", "categories.name as category")
        .join("categories", "articles.category_id", "categories.id")
        .whereIn("articles.category_id", categoryIds);

    if (search) {
        query = query.andWhere(builder => {
            builder.whereLike("title", `%${search}%`)
                .orWhereLike("abstract", `%${search}%`)
                .orWhereLike("content", `%${search}%`);
        });
    }

    return await query.offset(offset).limit(limit);
};

export const fetchArticlesByRole = async (role, userId, searchTerm) => {
    switch (role) {
        case 'admin':
            return await getAllArticles(searchTerm, 0, Number.MAX_SAFE_INTEGER);
        case 'writer':
            return await getArticlesByAuthor(userId, searchTerm, 0, Number.MAX_SAFE_INTEGER);
        case 'editor':
            const editorCategories = await getEditorCategories(userId);
            const categoryIds = editorCategories.map(category => category.category_id);
            return await getArticlesByCategoryIds(categoryIds, searchTerm, 0, Number.MAX_SAFE_INTEGER);
        default:
            return [];
    }
};
