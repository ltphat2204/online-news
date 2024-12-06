import { countArticles, createArticle, deleteArticleById, getAllArticles, getArticleById, updateArticleById } from "../../models/articles.js";

const LIMIT = 5;

export const getArticles = async (req, res) => {
    const page = req.query.page || 1;
    const offset = (page - 1) * LIMIT;
    const searchTerm = req.query.search || '';
    const articles = await getAllArticles(searchTerm, offset, LIMIT);

    const nPages = await countArticles(searchTerm);
    const pageItems = [];
    for (let i = 1; i <= nPages; i++) {
        const item = {
            value: i,
            isActive: i === page,
            searchTerm: searchTerm
        }
        pageItems.push(item);
    }

    res.render("admin/articles", {
        title: "Bài viết",
        empty: articles.length === 0,
        pageItems,
        searchTerm: searchTerm,
        articles,
    })
}

export const postArticle = async (req, res) => {
    const article = req.body;
    await createArticle(article);

    res.redirect("/admin/articles");
}

export const createArticleView = async (req, res) => {
    res.render("admin/create_article", {
        title: "Tạo bài viết",
        categories: res.locals.categories
    })
}

export const editArticle = async (req, res) => {
    const article = req.body;
    await updateArticleById(article.id, article);

    res.redirect("/admin/articles")
}

export const editArticleView = async (req, res) => {
    const { id } = req.query;
    const article = await getArticleById(id);

    res.render("admin/edit_article", {
        title: "Sửa bài viết",
        categories: res.locals.categories,
        article
    })
}

export const deleteArticle = async (req, res) => {
    const article = req.body;
    await deleteArticleById(article.id);

    res.redirect("/admin/articles");
}