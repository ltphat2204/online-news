import { createArticle, deleteArticleById, getArticleById, updateArticleById, addArticleHashtags, fetchArticlesByRole, getHashtagsByArticleId } from "../../models/articles.js";
import { getAllHashtags } from "../../models/hashtags.js";

const LIMIT = 5;

export const getArticles = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * LIMIT;
    const searchTerm = req.query.search || '';
    const authUser = req.session.authUser;

    const articles = await fetchArticlesByRole(authUser.role, authUser.id, searchTerm);

    const draftArticles = articles.filter(article => article.status === 'draft');
    const approvedArticles = articles.filter(article => article.status === 'approved');
    const publishedArticles = articles.filter(article => article.status === 'published');
    const rejectedArticles = articles.filter(article => article.status === 'rejected');

    const totalDraftPages = Math.ceil(draftArticles.length / LIMIT);
    const totalApprovedPages = Math.ceil(approvedArticles.length / LIMIT);
    const totalPublishedPages = Math.ceil(publishedArticles.length / LIMIT);
    const totalRejectedPages = Math.ceil(rejectedArticles.length / LIMIT);

    const generatePageItems = (totalPages) => {
        return Array.from({ length: totalPages }, (_, i) => ({
            value: i + 1,
            status: i + 1 === page ? "active" : "",
            searchTerm: searchTerm
        }));
    };

    const draftPageItems = generatePageItems(totalDraftPages);
    const approvedPageItems = generatePageItems(totalApprovedPages);
    const publishedPageItems = generatePageItems(totalPublishedPages);
    const rejectedPageItems = generatePageItems(totalRejectedPages);

    // Fetch all hashtags for the editor
    const allHashtags = await getAllHashtags();

    // Fetch categories and hashtags for each draft article
    for (const article of draftArticles) {
        article.hashtags = await getHashtagsByArticleId(article.id);
    }

    const categories = await res.locals.categories;

    res.render("admin/articles", {
        title: "Bài viết",
        empty: articles.length === 0,
        draftPageItems,
        approvedPageItems,
        publishedPageItems,
        rejectedPageItems,
        searchTerm,
        draftArticles: draftArticles.slice(offset, offset + LIMIT),
        approvedArticles: approvedArticles.slice(offset, offset + LIMIT),
        publishedArticles: publishedArticles.slice(offset, offset + LIMIT),
        rejectedArticles: rejectedArticles.slice(offset, offset + LIMIT),
        currentPage: page,
        totalDraftPages,
        totalApprovedPages,
        totalPublishedPages,
        totalRejectedPages,
        limit: LIMIT,
        allHashtags,
        categories
    });
};

export const postArticle = async (req, res) => {
    try {
        const { hashtags, ...article } = req.body;
        const author_id = req.session.authUser.id;

        article.is_premium = req.body.is_premium === "true";

        const result = await createArticle({ ...article, author_id });
        const articleId = result[0].id;

        await addArticleHashtags(articleId, hashtags || []);

        res.redirect('/admin/articles');
    } catch (error) {
        console.error('Error creating article:', error);
        res.status(500).send('Internal Server Error');
    }
};

export const publishNow = async (req, res) => {
    const { id } = req.query;
    const article = await getArticleById(id);

    await updateArticleById(article.id, { ...article, status: 'published', published_at: new Date() });

    res.redirect('/admin/articles');
}

export const createArticleView = async (req, res) => {
    const hashtags = await getAllHashtags();
    res.render("admin/create_article", {
        title: "Tạo bài viết",
        categories: res.locals.categories,
        hashtags
    });
}

export const editArticle = async (req, res) => {
    const article = req.body;
  
    // Nếu is_premium không tồn tại trong req.body, mặc định là false
    article.is_premium = article.is_premium === "true";
  
    await updateArticleById(article.id, article);
  
    res.redirect("/admin/articles");
  };
  

export const editArticleView = async (req, res) => {
    const { id } = req.query;
    const article = await getArticleById(id);
    const categories = res.locals.categories.map(c => {
        return {
            ...c,
            selected: c.id == article.category_id
        }
    }
    )

    res.render("admin/edit_article", {
        title: "Sửa bài viết",
        categories,
        article
    });
}

export const deleteArticle = async (req, res) => {
    const article = req.body;
    await deleteArticleById(article.id);

    res.redirect("/admin/articles");
}