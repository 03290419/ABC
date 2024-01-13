const { allProductService } = require('../services');
const { throwError } = require('../utils');
const { productSortService, categoryCheckService } = allProductService;

const allProduct = async (req, res) => {
  try {
    const { categoryId, subCategoryId, sortBy, page } = req.query;
    if (!categoryId || !page || !sortBy)
      throwError(400, 'query key categoryId, page, sortBy are required');
    const categoryCheckController = await categoryCheckService(
      subCategoryId,
      categoryId,
    );

    if (categoryCheckController[0].parent_id != categoryId) {
      const error = new Error();
      error.statusCode = 400;
      error.message = `category check result - main and sub category unmatched`;
      throw error;
    }

    const productSortServiceResult = await productSortService(
      subCategoryId,
      categoryId,
      sortBy,
      page,
    );
    const productSortController = productSortServiceResult;

    res.status(200).json({
      sortData: productSortController,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  allProduct,
};
