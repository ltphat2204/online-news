import { getAllArticles, getArticleBySlug } from "../models/articles.js";

export const getArticles = async (req, res) => {
    const articles = await getAllArticles();
    res.render('articles/main', {
        title: 'Bài báo',
        articles
    });
}

export const getArticle = async (req, res) => {
    const article = await getArticleBySlug(req.params.slug);
    res.render('articles/detail', {
        title: article.title,
        article
    });
}