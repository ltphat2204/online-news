import { 
    getAllCategoryGroups, 
    createCategoryGroup, 
    editCategoryGroup, 
    deleteCategoryGroup 
} from "../models/category_group.js";

export const getCategoryGroups = async (req, res) => {
    const categoryGroups = await getAllCategoryGroups();

    res.render('admin/category_group', {
        title: 'Danh mục',
        empty: categoryGroups.length === 0,
        categoryGroups
    });
}

export const postCategoryGroup = async (req, res) => {
    const categoryGroup = req.body;
    await createCategoryGroup(categoryGroup);

    res.redirect('/admin/category-group');
}

export const patchCategoryGroup = async (req, res) => {
    const { id } = req.body;
    const categoryGroup = req.body;
    await editCategoryGroup(id, categoryGroup);

    res.redirect('/admin/category-group');
}

export const deleteCategoryGroupById = async (req, res) => {
    const { id } = req.body;
    await deleteCategoryGroup(id);

    res.redirect('/admin/category-group');
}