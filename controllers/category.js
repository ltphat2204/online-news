import { 
    getAllCategory, 
    createCategory, 
    editCategory, 
    deleteCategory 
} from "../models/category.js";

export const getCategory = async (req, res) => {
    const categories = await getAllCategory();

    res.render('admin/category', {
        title: 'Chuyên mục',
        empty: category.length === 0,
        category
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