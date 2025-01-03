import {
    createHashtags,
    countHashtags,
    editHashtag,
    deleteHashtag,
    searchHashtags,
    countHashtagArticles,
    getHashtagByID,
    searchHashtagArticles
} from "../models/hashtags.js";

export const getHashtagArticlesPage = async (req, res) => {
    const limit = 4;
    const id = req.params.id;
    const page = req.query.page || 1;
    const offset = (page - 1) * limit;
    const n = await countHashtagArticles(id);
    const totalPages = Math.ceil(n.total / limit);
    const hashtag = await getHashtagByID(id);
    const articles = await searchHashtagArticles(id, limit, offset);

    res.render('hashtags/articles', {
        title: 'Bài viết theo chủ đề ' + hashtag.tag_name,
        empty: articles.length === 0,
        articles,
        ID: id,
        pagination: {
            limit: parseInt(limit, 10),
            totalRows: articles.length,
            currentPage: parseInt(page, 10),
            totalPages: parseInt(totalPages, 10),
        }
    });
}

export const getHashtags = async (req, res) => {
    const limit = 5;
    const searchTerm = req.query.search || '';
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;

    const n = await countHashtags(searchTerm);
    const totalPages = Math.ceil(n.total / limit);
    const pageItems = Array.from({ length: totalPages }, (_, i) => ({
        value: i + 1,
        status: i + 1 === page ? "active" : "",
        searchTerm: searchTerm
    }));

    const hashtags = await searchHashtags(searchTerm, limit, offset);

    // Count articles for each hashtag
    for (const hashtag of hashtags) {
        hashtag.usage = (await countHashtagArticles(hashtag.id)).total;
    }

    res.render('admin/hashtags', {
        title: 'Thẻ',
        empty: hashtags.length === 0,
        hashtags,
        pageItems,
        searchTerm,
        currentPage: page,
        totalPages
    });
};

export const postHashtag = async (req, res) => {
    const hashtag = req.body;
    await createHashtags(hashtag);

    res.redirect('/admin/hashtags');
}

export const patchHashtag = async (req, res) => {
    const { id } = req.body;
    const hashtag = req.body;
    await editHashtag(id, hashtag);
    res.redirect('/admin/hashtags');
}

export const deleteHashtagByID = async (req, res) => {
    const { id } = req.body;
    await deleteHashtag(id);
    res.redirect('/admin/hashtags');
}