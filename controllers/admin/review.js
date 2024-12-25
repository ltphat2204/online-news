import { getArticleByEditors, countDraftArticles, updateArticleById, updateArticleHashtag } from "../../models/articles.js";
import { getHashtagID } from "../../models/hashtags.js";

export const getArticleList = async (req, res) => {
    const limit = 5;
    const searchTerm = req.query.search || '';
    const page = parseInt(req.query.page) || 1;

    const n = await countDraftArticles(searchTerm);
    console.log(n);
    const totalPages = Math.ceil(n / limit);
    const pageItems = [];

    const offset = (page - 1) * limit;
    const articles = await getArticleByEditors(searchTerm, limit, offset);
    console.log(articles);
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
        searchTerm: searchTerm
    });
}

export const updateArticle = async (req, res) => {
    const article = req.body;
    const newArticle = {
        id: article.id,
        status: article.status,
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