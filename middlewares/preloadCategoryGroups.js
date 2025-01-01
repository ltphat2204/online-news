import { getAllCategoryGroups } from '../models/category_group.js';
import { getAllCategories } from '../models/category.js';

const preloadNavBar = async (req, res, next) => {
    try {
        const [categoryGroups, categories] = await Promise.all([
            getAllCategoryGroups(),
            getAllCategories()
        ]);

        const categoriesByGroup = categories.reduce((acc, category) => {
            const groupId = category.group_id;
            if (!acc[groupId]) {
                acc[groupId] = [];
            }
            acc[groupId].push(category);
            return acc;
        }, {});

        const categoryGroupsWithCategories = categoryGroups.map(group => ({
            ...group,
            categories: categoriesByGroup[group.id] || []
        }));

        res.locals.categoryGroupsWithCategories = categoryGroupsWithCategories;

        next();
    } catch (error) {
        console.error('Error preloading navigation bar:', error);
        res.status(500).send('Internal Server Error');
    }
};

export default preloadNavBar;