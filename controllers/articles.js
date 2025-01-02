import { getAllArticles, getArticleInfoById, getArticlesByCategory, addComment, getCommentsByArticleId, getHashtagsByArticleId, fullTextSearchArticles, increaseArticleViewCount, } from "../models/articles.js";
import { getAllCategoryGroups } from "../models/category_group.js";
import { getAllCategories } from "../models/category.js";
import moment from "moment";
import { createPDF } from "../utils/pdf.js";

export const getArticles = async (req, res) => {
    const articles = await getAllArticles();
    res.render('articles/main', {
        title: 'Bài báo',
        articles
    });
}

const addInlineStylesToMedia = (content) => {
    return content
        .replace(/<img /g, '<img class="img-fluid mx-auto d-block" ')
        .replace(/<video /g, '<video class="embed-responsive-item" ')
        .replace(/<iframe /g, '<iframe class="embed-responsive-item" ');
};

export const exportToPdf = async (req, res) => {
    const articleId = req.params.id;
    if (articleId) {
        const article = await getArticleInfoById(articleId);
        if (!article) {
            res.render('404', {
                title: 'Không tìm thấy trang',
                message: 'Rất tiếc, bài báo bạn tìm kiếm không tồn tại.'
            });
            return;
        }

        article.content = addInlineStylesToMedia(article.content);
        const hashtags = await getHashtagsByArticleId(article.id);
        article.hashtags = hashtags;

        const pdf = await createPDF(article);
        res.set({
            'Content-Encoding': 'identity',
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="${encodeURIComponent(article.title.replace(/[^a-z0-9]/gi, '_').toLowerCase())}.pdf"`,
            'Content-Length': pdf.length,
        });
        res.end(pdf, 'binary');
    } else {
        res.redirect('/');
    }
}

export const showArticle = async (req, res) => {
    if (req.query.id) {
        const article = await getArticleInfoById(req.query.id);
        if (!article) {
            res.render('404', {
                title: 'Không tìm thấy trang',
                message: 'Rất tiếc, bài báo bạn tìm kiếm không tồn tại.'
            });
            return;
        }
        
        article.content = addInlineStylesToMedia(article.content);
        const category_articles = await getArticlesByCategory(article.category_id, article.id);
        const comments = await getCommentsByArticleId(article.id);
        const hashtags = await getHashtagsByArticleId(article.id);
        article.hashtags = hashtags;
        let view = article.view_count;
        
        if (!req.session.viewCount || moment().diff(req.session.viewCount, 'minutes') > 60) {
            req.session.viewCount = moment().format('YYYY-MM-DD hh:mm:ss');
            view = await increaseArticleViewCount(article.id);
        }

        const guest = !req.session.auth;

        res.render('articles/detail', {
            title: article.title,
            article: { ...article, view_count: view},
            category_articles,
            comments,
            guest
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
    const categoryGroups = await getAllCategoryGroups();
    const categories = await getAllCategories()||"";
    if(Object.keys(req.query).length === 0)
    {
        res.render('articles/search', {
            title: 'Bài báo',
            empty: true,
            message: "Hãy bắt đầu tìm kiếm điều bạn quan tâm!",
            categoryGroups: categoryGroups,
        }); 
        return;
    }
    const searchQuery = req.query.search.trim() || "";
    const categoryGroup = req.query.categoryGroup || "";
    const category = req.query.category || "";
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const offset = (page - 1) * limit || 0;

    const articles = await fullTextSearchArticles(searchQuery, categoryGroup, category, limit, offset);
    const totalPages = Math.ceil(articles.total / limit);
    res.render('articles/search', {
        title: 'Bài báo',
        pagination: {
            totalPages: parseInt(totalPages, 10),
            currentPage: parseInt(page, 10),
            query: searchQuery,
            categoryGroup: categoryGroup,
            category: category
        },
        empty: articles.results.length === 0,
        articles: articles.results,
        categoryGroups,
        categories,
        message: "Chúng tôi rất tiếc! Nhưng hãy thử với các từ khóa khác để tìm được nội dung mong muốn."
    });
    return;
}