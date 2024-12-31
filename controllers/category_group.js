import {
    getAllCategoryGroups,
    createCategoryGroup,
    editCategoryGroup,
    deleteCategoryGroup,
    getCategoryGroupById // Ensure correct function name is imported
} from "../models/category_group.js";

export const getCategoryGroups = async (req, res) => {
    const categoryGroups = await getAllCategoryGroups();

    res.render('admin/category_group', {
        title: 'Danh mục',
        empty: categoryGroups.length === 0,
        categoryGroups
    });
}

export const getCategoryGroupsDetail = async (req, res) => {
    const { id } = req.params; // Use URL parameters instead of query parameters
    if (!id) {
        return res.redirect('/'); // Redirect to home if no ID is provided
    }
    const categoryGroup = await getCategoryGroupById(id); // Ensure correct function name is called
    res.render('category_groups/detail', {
        title: categoryGroup.name,
        categoryGroup
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