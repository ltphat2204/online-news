import { 
    getAllCategories, 
    createCategory, 
    editCategory, 
    deleteCategory,
    getCategoriesWithPagination,
    countCategories
} from "../models/category.js";

export const getCategory = async (req, res) => {
    try
    {
        const limit = 2;
        const page = parseInt(req.query.page, 10) || 1;
        const offset = (page-1)*limit||0;

        // Kiểm tra tính hợp lệ của các tham số đầu vào
        if (isNaN(limit) || limit <= 0) {
            return res.status(400).json({ error: "Invalid 'k' value. It must be a positive integer." });
        }
        if (isNaN(offset) || offset < 0) {
            return res.status(400).json({ error: "Invalid 's' value. It must be a non-negative integer." });
        }

        const categories = await getCategoriesWithPagination(limit, offset);
        //number of pages
        const countResult = await countCategories();
        const totalPages = Math.ceil(countResult.total/ limit);
        const pageArray = Array.from({ length: totalPages }, (_, i) => i + 1);
        res.render('admin/category',{
            title: 'Quản lý chuyên mục',
            categories,
            currentPage: page,
            totalPages,
            pageArray,
            limit,
            empty: categories.length === 0,
            categoryGroups: res.locals.categoryGroups,
        });
    }
    catch (error) {
        console.error("Error fetching paginated categories:", error);
        res.status(500).json({ error: "An error occurred while fetching categories." });
    }
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