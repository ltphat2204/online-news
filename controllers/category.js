import {
    getAllCategories,
    createCategory,
    editCategory,
    deleteCategory,
    getCategoriesWithPagination,
    countCategories,
    countSearchCategories,
    searchCategoryByName
} from "../models/category.js";

export const getRender = async (req, res) => {
    res.render('admin/category')
}
export const getCategory = async (req, res) => {
    try {
        const type = req.query.type;
        const limit = isNaN(parseInt(req.query.limit, 10)) ? 5 : parseInt(req.query.limit, 10);
        const page = isNaN(parseInt(req.query.page, 10)) ? 1 : parseInt(req.query.page, 10);
        const offset = (page - 1) * limit || 0;

        // Kiểm tra tính hợp lệ của các tham số đầu vào
        if (isNaN(limit) || limit <= 0) {
            return res.status(400).json({ error: "Invalid 'k' value. It must be a positive integer." });
        }
        if (isNaN(offset) || offset < 0) {
            return res.status(400).json({ error: "Invalid 's' value. It must be a non-negative integer." });
        }

        var categories =[];
        var countResult = {};
        if(type === 'search'){
            const searchVal = req.query.search;
            categories = await searchCategoryByName(searchVal, limit, offset);
            countResult = await countSearchCategories(searchVal);
        }
        else
        {
            categories = await getCategoriesWithPagination(limit, offset);
            countResult = await countCategories();
        }
        //number of pages
        
        const totalPages = Math.ceil(countResult.total / limit);
        const pageArray = Array.from({ length: totalPages }, (_, i) => i + 1);
        res.json({
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

// export const searchCategory = async (req, res) => {
//     const limit = isNaN(parseInt(req.query.limit, 10)) ? 5 : parseInt(req.query.limit, 10);
//     const page = isNaN(parseInt(req.query.page, 10)) ? 1 : parseInt(req.query.page, 10);
//     const offset = (page - 1) * limit || 0;
//     const { search } = req.query;
//     const categories = await searchCategoryByName(search, limit, offset);
//     const countResult = await countSearchCategories(search);
//     const totalPages = Math.ceil(countResult.total / limit);
//     const pageArray = Array.from({ length: totalPages }, (_, i) => i + 1);
//     res.json({
//         categories,
//         currentPage: page,
//         totalPages,
//         pageArray,
//         limit,
//         empty: Array.isArray(categories) ? categories.length === 0 : true,
//         categoryGroups: res.locals.categoryGroups,
//     });
// }