import { getAllCategories } from "../models/category.js"

export default async function preloadCategories(req, res, next) {
    const categories = await getAllCategories();
    res.locals.categories = categories;
    next();
}