import { 
    getAllCategories, 
    createCategory, 
    editCategory, 
    deleteCategory,
    getKCategoryFromS
} from "../models/category.js";

export const getCategory = async (req, res) => {
    const categories = await getAllCategories();
    res.render('admin/category', {
        title: 'Chuyên mục',
        empty: categories.length === 0,
        categories,
        categoryGroups: res.locals.categoryGroups
    });
}

export const postCategory = async (req, res) => {
    const category = req.body;
    await createCategory(category);

    res.redirect('/admin/category');
}

export const patchCategory = async (req, res) => {
    const { id } = req.body;
    const category = req.body;
    await editCategory(id, category);

    res.redirect('/admin/category');
}

export const deleteCategoryById = async (req, res) => {
    const { id } = req.body;
    await deleteCategory(id);

    res.redirect('/admin/category');
}

export const getKCategory = async (req, res) => {
    const { k, s } = req.body;
    const categories = await getKCategoryFromS(k, s);
    res.render('admin/category', {
        title: 'Chuyên mục',
        empty: categories.length === 0,
        categories,
        categoryGroups: res.locals.categoryGroups
    });
}