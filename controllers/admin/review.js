import { getArticleByEditors, countDraftArticles, updateArticleById, updateArticleHashtag } from "../../models/articles.js";
import { getHashtagID, getAllHashtags } from "../../models/hashtags.js";
import { getEditorByUsername } from "../../models/user.js";
import schedule from "node-schedule";
import moment from "moment";

export const getArticleList = async (req, res) => {
    const limit = 5;
    const searchTerm = req.query.search || '';
    const page = parseInt(req.query.page) || 1;

    const n = await countDraftArticles(searchTerm);
    const totalPages = Math.ceil(n / limit);
    const pageItems = [];

    const offset = (page - 1) * limit;
    const articles = await getArticleByEditors(searchTerm, limit, offset);
    const hashtags = await getAllHashtags();

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
        hashtags,
        pageItems: pageItems,
        searchTerm: searchTerm,
        user: req.session.authUser
    });
}

export const updateArticle = async (req, res) => {
    try {
        const article = req.body;
        const editor = await getEditorByUsername(article.editor_id);

        const newArticle = {
            id: article.id,
            status: article.status,
            editor_id: editor.id,
            published_at: article.published_at,
            category_id: article.category_id
        };

        await updateArticleById(newArticle.id, newArticle);

        const newHashtag = { tag_id: article.hashtags };
        await updateArticleHashtag(newArticle.id, newHashtag);

        if (moment(newArticle.published_at).isAfter(moment())) {
            schedule.scheduleJob(moment(newArticle.published_at).toDate(), async () => {
                try {
                    await updateArticleById(newArticle.id, { ...newArticle, status: 'published' });
                    console.log(`Article ${newArticle.id} published at ${newArticle.published_at}`);
                } catch (err) {
                    console.error(`Failed to publish article ${newArticle.id}:`, err);
                }
            });
        } else {
            try {
                await updateArticleById(newArticle.id, { ...newArticle, status: 'published' });
                console.log(`Article ${newArticle.id} published at ${newArticle.published_at}`);
            } catch (err) {
                console.error(`Failed to publish article ${newArticle.id}:`, err);
            }
        }

        res.redirect("/admin/articles");
    } catch (err) {
        console.error("Error updating article:", err);
        res.status(500).send("Internal Server Error");
    }
};

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