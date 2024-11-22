import database from "../config/database.js";

export const getAllArticles = async () => {
    const articles = await database("articles").select("*");
    return articles;
}

export const getArticleBySlug = async (slug) => {
    //Select * from articles where slug = slug
    const article = await database("articles").where({ slug: slug }).first();
    return article;
}