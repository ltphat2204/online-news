import { getArticleByEditors, countArticles } from "../../models/articles.js";

export const getArticleList = async (req, res) => {
    const limit = 5;
    const searchTerm = req.query.search || '';
    const page = parseInt(req.query.page) || 1;

    const n = await countArticles(searchTerm);
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
        searchTerm: searchTerm
    });
}