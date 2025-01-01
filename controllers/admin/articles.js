import { countArticles, createArticle, deleteArticleById, getAllArticles, getArticleById, updateArticleById, addArticleHashtags } from "../../models/articles.js";
import { getAllHashtags } from "../../models/hashtags.js";

const LIMIT = 5;

export const getArticles = async (req, res) => {
    const page = req.query.page || 1;
    const offset = (page - 1) * LIMIT;
    const searchTerm = req.query.search || '';
    const articles = await getAllArticles(searchTerm, offset, LIMIT);

    const nPages = await countArticles(searchTerm) / LIMIT;
    const pageItems = [];
    for (let i = 1; i <= nPages; i++) {
        const item = {
            value: i,
            status: i == page ? "active" : "",
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
    try {
        const { hashtags, ...article } = req.body; 
        const author_id = req.session.authUser.id;

        const result = await createArticle({ ...article, author_id });
        const articleId = result[0].id;

        // Add hashtags to the article
        await addArticleHashtags(articleId, hashtags || []);

        res.redirect('/admin/articles');
    } catch (error) {
        console.error('Error creating article:', error);
        res.status(500).send('Internal Server Error');
    }
};

export const createArticleView = async (req, res) => {
    const hashtags = await getAllHashtags();
    res.render("admin/create_article", {
        title: "Tạo bài viết",
        categories: res.locals.categories,
        hashtags
    });
}

export const editArticle = async (req, res) => {
    const article = req.body;
    await updateArticleById(article.id, article);

    res.redirect("/admin/articles")
}

export const editArticleView = async (req, res) => {
    const { id } = req.query;
    const article = await getArticleById(id);
    const categories = res.locals.categories.map(c => {
        return {
            ...c,
            selected: c.id == article.category_id
        }
    }
    )

    res.render("admin/edit_article", {
        title: "Sửa bài viết",
        categories,
        article
    })
}

export const deleteArticle = async (req, res) => {
    const article = req.body;
    await deleteArticleById(article.id);

    res.redirect("/admin/articles");
}