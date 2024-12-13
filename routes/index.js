import express from 'express';
import preloadCategoryGroups from '../middlewares/preloadCategoryGroups.js';
import { getAllCategories } from '../models/category.js';
const router = express.Router();

router.get('/', preloadCategoryGroups, async (req, res) => {
    if (!req.session.views) {
        req.session.views = 1;
      } else {
        req.session.views++;
      }
    if (!req.session.auth) {
      req.session.auth = false;
    }
    res.locals.authUser = req.session.authUser;
    res.locals.auth = req.session.auth;

    const categoryGroups = await res.locals.categoryGroups.map(async (categoryGroup) => ({
      group_name: categoryGroup.name,
      categories: await getAllCategories(categoryGroup.id)
    }));

    const category = await Promise.all(categoryGroups);

    res.render('home', {
        title: 'Trang chủ',
        categoryGroups: category,
    });
});

export default router;