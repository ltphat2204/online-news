import { getAllCategoryGroups } from '../models/category_group.js';

export default async function preloadCategoryGroups(req, res, next) {
    const categoryGroups = await getAllCategoryGroups();
    res.locals.categoryGroups = categoryGroups;
    next();
}