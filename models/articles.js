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
    const result = await database("articles")
                    .whereLike("title", `% ${search} %`)
                    .orWhereLike("abstract", `% ${search} %`)
                    .orWhereLike("content", `% ${search} %`)
                    .count("* as total").first();
    return result;
}

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

export const getArticleBySlug = async (slug) => {
    //Select * from articles where slug = slug
    const article = await database("articles").where({ slug: slug }).first();
    return article;
}