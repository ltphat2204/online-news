import { getEditors, countEditors } from "../../models/user.js";
import { searchCategoryByEditors, removeCategoryByEditors, insertCategoryByEditors } from "../../models/category.js";

export const getEditorLists = async (req, res) => {
    const limit = 5;
    const searchTerm = req.query.search || '';
    const page = parseInt(req.query.page) || 1;

    const n = await countEditors(searchTerm);
    const totalPages = Math.ceil(n.total / limit);
    const pageItems = [];

    const offset = (page - 1) * limit;
    const editors = await getEditors(searchTerm, limit, offset);

    const editorsCategories = await Promise.all(editors.map(async (editor) => {
        const categories = await searchCategoryByEditors(editor.id);
        return {
            ...editor,
            categoryNames: categories.map(category => category.name),
            categoryIds: categories.map(category => category.category_id)
        };
    }));

    for (let i = 1; i <= totalPages; i++) {
        const item = {
            value: i,
            isActive: i === page,
            searchTerm: searchTerm
        }
        pageItems.push(item);
    }

    res.render("admin/assign", {
        title: 'Phân công',
        empty: editorsCategories.length === 0,
        editorsCategories,
        pageItems: pageItems,
        searchTerm: searchTerm,
        categories: res.locals.categories
    });
}
export const editAssignments = async (req, res) => {
    const id = req.body.id;
    const categories = req.body.group_id;

    const dataList = categories.map(category => ({
        editor_id: id,
        category_id: category
    }));
    await removeCategoryByEditors(id);
    await insertCategoryByEditors(dataList);
    res.redirect('/admin/assign');
}