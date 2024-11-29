import {
    getAllHashtags,
    createHashtags,
    editHashtag,
    deleteHashtag
} from "../models/hashtags.js";

export const getHashtags = async (req, res) => {
    const hashtags = await getAllHashtags();

    res.render('admin/hashtags', {
        title: 'Thẻ',
        empty: hashtags.length === 0,
        hashtags
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