import {
    getAllCategories,
    createCategory,
    editCategory,
    deleteCategory,
    getCategoriesWithPagination,
    countCategories,
    countSearchCategories,
    searchCategoryByName,
    getCategoryByCategoryGroup} from "../models/category.js";
    import { getArticlesByCategoryID } from "../models/articles.js";
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

export const searchCategoryByCategoryGroup = async (req, res) => {
    const categoryGroup = req.query.categoryGroup;
    const categories = await getCategoryByCategoryGroup(categoryGroup);
    res.json({ categories });
}

export const getArticlesByCategoryIDController = async (req, res) => {
    const { id } = req.params;
    const page = req.query.page||1;
    const limit = req.query.limit || 5;
    const offset = (page-1) * limit || 0;
    const data = await getArticlesByCategoryID(id, limit, offset);
    const articles = data.articles;
    const totalPages = Math.ceil(data.total / limit);
    res.render('category/detail',
        {
            title: articles[0].category_name,
            description: articles[0].category_description,
            ID: id, 
            articles: articles,
            empty: articles.length === 0,
            pagination: {
                limit: parseInt(limit, 10),
                totalRows: articles.length,
                currentPage: parseInt(page, 10),
                totalPages: parseInt(totalPages, 10),
            }
        }
     );
}
