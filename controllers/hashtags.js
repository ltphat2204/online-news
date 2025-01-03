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
    const limit = 4;
    const searchTerm = req.query.search || '';
    const page = req.query.page || 1;

    const n = await countHashtags(searchTerm);
    const nPages = Math.ceil(n.total / limit);
    const pageItems = [];

    const offset = (page - 1) * limit;
    const hashtags = await searchHashtags(searchTerm, limit, offset)

    for (let i = 1; i <= nPages; i++) {
        const item = {
            value: i,
            isActive: i === page,
            searchTerm: searchTerm
        }
        pageItems.push(item);
    }

    res.render('admin/hashtags', {
        title: 'Thẻ',
        empty: hashtags.length === 0,
        hashtags,
        pageItems: pageItems,
        searchTerm: searchTerm
    });
}

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