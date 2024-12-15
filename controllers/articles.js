import { getAllArticles, getArticleInfoById, getArticlesByCategory, addComment, getCommentsByArticleId, fullTextSearchArticles } from "../models/articles.js";
import { getAllCategoryGroups } from "../models/category_group.js";
import { getAllCategories } from "../models/category.js";

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

const addInlineStylesToMedia = (content) => {
    return content
        .replace(/<img /g, '<img class="img-fluid mx-auto d-block" ')
        .replace(/<video /g, '<video class="embed-responsive-item" ')
        .replace(/<iframe /g, '<iframe class="embed-responsive-item" ');
};

export const showArticle = async (req, res) => {
    if (req.query.id) {
        const article = await getArticleInfoById(req.query.id);
        article.content = addInlineStylesToMedia(article.content);
        const category_articles = await getArticlesByCategory(article.category_id, article.id);
        const comments = await getCommentsByArticleId(article.id);
        res.render('articles/detail', {
            title: article.title,
            article,
            category_articles,
            comments
        });
    } else {
        res.redirect('/');
    }
}

export const postComment = async (req, res) => {
    const { guest_name, content } = req.body;
    const article_id = req.params.id;
    await addComment({ guest_name, content, article_id });
    res.redirect(`/articles?id=${article_id}`);
}


export const searchArticles = async (req, res) => {
    const searchQuery = req.query.search||"";
    const page = req.query.page||1;
    const limit = req.query.limit || 5;
    const offset = (page-1) * limit || 0;

    const articles = await fullTextSearchArticles(searchQuery, limit, offset);
    const categoryGroups = await getAllCategoryGroups();
    const categories = await getAllCategories();
    const totalPages = Math.ceil(articles.total / limit);
    res.render('articles/search', {
        title: 'Bài báo',
        totalPages: totalPages,
        currentPage: page,
        empty: articles.total === 0,
        articles: articles.results,
        categoryGroups,
        categories
    });
}