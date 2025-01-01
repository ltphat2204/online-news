import { getArticleByEditors, countDraftArticles, updateArticleById, updateArticleHashtag } from "../../models/articles.js";
import { getHashtagID } from "../../models/hashtags.js";
import { getEditorByUsername } from "../../models/user.js";

export const getArticleList = async (req, res) => {
    const limit = 5;
    const searchTerm = req.query.search || '';
    const page = parseInt(req.query.page) || 1;

    const n = await countDraftArticles(searchTerm);
    const totalPages = Math.ceil(n / limit);
    const pageItems = [];

    const offset = (page - 1) * limit;
    const articles = await getArticleByEditors(searchTerm, limit, offset);

    for (let i = 1; i <= totalPages; i++) {
        const item = {
            value: i,
            isActive: i === page,
            searchTerm: searchTerm
        }
        pageItems.push(item);
    }

    res.render("admin/review", {
        title: 'Duyệt bài',
        empty: articles.length === 0,
        articles,
        pageItems: pageItems,
        searchTerm: searchTerm,
        user: req.session.authUser
    });
}

export const updateArticle = async (req, res) => {
    const article = req.body;
    const editorID = await getEditorByUsername(article.editor_id);
    const newArticle = {
        id: article.id,
        status: article.status,
        editor_id: editorID.id,
        category_id: article.category_id
    };
    await updateArticleById(newArticle.id, newArticle);
    const hashtagID = await getHashtagID(article.hashtags);
    const newHashtag = {
        tag_id: hashtagID.id
    };

    await updateArticleHashtag(newArticle.id, newHashtag);
    res.redirect("/admin/review")
}

export const disapproveArticle = async (req, res) => {
    const article = req.body;
    const editorID = await getEditorByUsername(article.editor_id);
    const newArticle = {
        id: article.id,
        status: article.status,
        editor_id: editorID.id,
        category_id: article.category_id,
        reject_reason: article.reject_reason
    };

    await updateArticleById(newArticle.id, newArticle);
    res.redirect("/admin/review");
}