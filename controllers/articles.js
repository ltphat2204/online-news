import { getAllArticles, getArticleInfoById, getArticlesByCategory, addComment, getCommentsByArticleId, getHashtagsByArticleId } from "../models/articles.js";

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