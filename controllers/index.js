import { getLatestPublishedArticles, getFeaturedArticles, getMostViewedPublishedArticles, getTopCategoriesWithLatestArticle } from '../models/articles.js';
import { dateHelpers } from '../utils/dateHelpers.js';

export const getHomePage = async (req, res) => {
    const latestPosts = await getLatestPublishedArticles(10);
    const featuredPosts = await getFeaturedArticles(4);
    const mostViewedPosts = await getMostViewedPublishedArticles(10);
    const topCategories = await getTopCategoriesWithLatestArticle(4);

    const topCategoryIds = topCategories.map(category => category.id);

    res.render('home', {
        title: 'Trang chủ',
        latestPosts,
        featuredPosts,
        mostViewedPosts,
        topCategories,
        topCategoryIds
    });
};