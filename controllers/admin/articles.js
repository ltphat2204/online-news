import { countArticles, createArticle, deleteArticleById, getAllArticles, getArticlesByAuthor, getArticleById, updateArticleById, addArticleHashtags, getArticlesByCategoryIds } from "../../models/articles.js";
import { getAllHashtags } from "../../models/hashtags.js";
import { getEditorCategories } from "../../models/editor_category.js";

const LIMIT = 5;

export const getArticles = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * LIMIT;
    const searchTerm = req.query.search || '';
    let articles, totalArticles;

    if (req.session.authUser.role === 'admin') {
        articles = await getAllArticles(searchTerm, 0, Number.MAX_SAFE_INTEGER); 
        totalArticles = await countArticles(searchTerm);
    } else if (req.session.authUser.role === 'writer') {
        articles = await getArticlesByAuthor(req.session.authUser.id, searchTerm, 0, Number.MAX_SAFE_INTEGER); 
        totalArticles = articles.length;
    } else if (req.session.authUser.role === 'editor') {
        const editorCategories = await getEditorCategories(req.session.authUser.id);
        const categoryIds = editorCategories.map(category => category.category_id);
        articles = await getArticlesByCategoryIds(categoryIds, searchTerm, 0, Number.MAX_SAFE_INTEGER);
        totalArticles = articles.length;
    }

    const draftArticles = articles.filter(article => article.status === 'draft');
    const approvedArticles = articles.filter(article => article.status === 'approved');
    const publishedArticles = articles.filter(article => article.status === 'published');
    const rejectedArticles = articles.filter(article => article.status === 'rejected');

    const totalDraftPages = Math.ceil(draftArticles.length / LIMIT);
    const totalApprovedPages = Math.ceil(approvedArticles.length / LIMIT);
    const totalPublishedPages = Math.ceil(publishedArticles.length / LIMIT);
    const totalRejectedPages = Math.ceil(rejectedArticles.length / LIMIT);

    const draftPageItems = [];
    const approvedPageItems = [];
    const publishedPageItems = [];
    const rejectedPageItems = [];

    for (let i = 1; i <= totalDraftPages; i++) {
        draftPageItems.push({
            value: i,
            status: i == page ? "active" : "",
            searchTerm: searchTerm
        });
    }

    for (let i = 1; i <= totalApprovedPages; i++) {
        approvedPageItems.push({
            value: i,
            status: i == page ? "active" : "",
            searchTerm: searchTerm
        });
    }

    for (let i = 1; i <= totalPublishedPages; i++) {
        publishedPageItems.push({
            value: i,
            status: i == page ? "active" : "",
            searchTerm: searchTerm
        });
    }

    for (let i = 1; i <= totalRejectedPages; i++) {
        rejectedPageItems.push({
            value: i,
            status: i == page ? "active" : "",
            searchTerm: searchTerm
        });
    }

    res.render("admin/articles", {
        title: "Bài viết",
        empty: articles.length === 0,
        draftPageItems,
        approvedPageItems,
        publishedPageItems,
        rejectedPageItems,
        searchTerm,
        draftArticles: draftArticles.slice(offset, offset + LIMIT),
        approvedArticles: approvedArticles.slice(offset, offset + LIMIT),
        publishedArticles: publishedArticles.slice(offset, offset + LIMIT),
        rejectedArticles: rejectedArticles.slice(offset, offset + LIMIT),
        currentPage: page,
        totalDraftPages,
        totalApprovedPages,
        totalPublishedPages,
        totalRejectedPages,
        limit: LIMIT
    });
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

    res.redirect("/admin/articles");
}

export const editArticleView = async (req, res) => {
    const { id } = req.query;
    const article = await getArticleById(id);

    res.render("admin/edit_article", {
        title: "Sửa bài viết",
        categories: res.locals.categories,
        article
    });
}

export const deleteArticle = async (req, res) => {
    const article = req.body;
    await deleteArticleById(article.id);

    res.redirect("/admin/articles");
}