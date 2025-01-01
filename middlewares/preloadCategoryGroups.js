import { getAllCategoryGroups } from '../models/category_group.js';
import { getAllCategories } from '../models/category.js';

const preloadNavBar = async (req, res, next) => {
    const categoryGroups = await getAllCategoryGroups();
    const categoryGroupsWithCategories = await Promise.all(categoryGroups.map(async (categoryGroup) => ({
        id: categoryGroup.id,
        name: categoryGroup.name,
        description: categoryGroup.description,
        categories: await getAllCategories(categoryGroup.id)
    })));
    res.locals.categoryGroupsWithCategories = categoryGroupsWithCategories;
    next();
};

export default preloadNavBar;