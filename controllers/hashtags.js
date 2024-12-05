import {
    getAllHashtags,
    createHashtags,
    countHashtags,
    editHashtag,
    deleteHashtag,
    searchHashtags
} from "../models/hashtags.js";

export const getHashtags = async (req, res) => {
    const limit = 4;
    const searchTerm = req.query.search || '';
    const page = req.query.page || 1;

    const n = await countHashtags();
    const nPages = Math.ceil(n.total / limit);
    const pageItems = [];
    for (let i = 1; i <= nPages; i++) {
        const item = {
            value: i,
            isActive: i === page
        }
        pageItems.push(item);
    }

    const offset = (page - 1) * limit;

    const hashtags = searchTerm 
        ? await searchHashtags(searchTerm, limit, offset)
        : await getAllHashtags(limit, offset);
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