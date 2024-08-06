const productModel = require("./productModel");

// Product Controllers
const renderAllProducts = async (req, res) => {
  try {
    const products = await productModel.getAllProducts();
    res.status(200).json({ data: products, message: "All products fetched" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching all products" });
  }
};

const renderProductById = async (req, res) => {
  try {
    const product = await productModel.getProductById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ data: product, message: "Product fetched by ID" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching product by ID" });
  }
};

const createNewProduct = async (req, res) => {
  try {
    const product = await productModel.createProduct(req.body);
    res.status(200).json({ data: product, message: "New product created" });
  } catch (error) {
    res.status(500).json({ message: "Error creating new product" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await productModel.updateProduct(req.params.id, req.body);
    res
      .status(200)
      .json({ data: product, message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating product" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await productModel.removeProduct(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
};

// Category Controllers
const renderAllCategories = async (req, res) => {
  try {
    console.log("render all categories of product");
    const categories = await productModel.getAllCategories();
    res
      .status(200)
      .json({ data: categories, message: "All categories fetched" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching all categories" });
  }
};

const renderCategoryById = async (req, res) => {
  try {
    const category = await productModel.getCategoryById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.status(200).json({ data: category, message: "Category fetched by ID" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching category by ID" });
  }
};

const createNewCategory = async (req, res) => {
  try {
    const category = await productModel.createCategory(req.body.category_name);
    res.status(200).json({ data: category, message: "New category created" });
  } catch (error) {
    res.status(500).json({ message: "Error creating new category" });
  }
};

const updateCategory = async (req, res) => {
  try {
    const category = await productModel.updateCategory(
      req.params.id,
      req.body.category_name
    );
    res
      .status(200)
      .json({ data: category, message: "Category updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating category" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    await productModel.removeCategory(req.params.id);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category" });
  }
};

// Subcategory Controllers
const renderAllSubcategories = async (req, res) => {
  try {
    const subcategories = await productModel.getAllSubcategories();
    res
      .status(200)
      .json({ data: subcategories, message: "All subcategories fetched" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching all subcategories" });
  }
};

const renderSubcategoryById = async (req, res) => {
  try {
    const subcategory = await productModel.getSubcategoryById(req.params.id);
    if (!subcategory)
      return res.status(404).json({ message: "Subcategory not found" });
    res
      .status(200)
      .json({ data: subcategory, message: "Subcategory fetched by ID" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching subcategory by ID" });
  }
};

const createNewSubcategory = async (req, res) => {
  try {
    const subcategory = await productModel.createSubcategory(
      req.body.subcategory_name,
      req.body.category_id
    );
    res
      .status(200)
      .json({ data: subcategory, message: "New subcategory created" });
  } catch (error) {
    res.status(500).json({ message: "Error creating new subcategory" });
  }
};

const updateSubcategory = async (req, res) => {
  try {
    const subcategory = await productModel.updateSubcategory(
      req.params.id,
      req.body.subcategory_name
      //   req.body.category_id
    );
    res
      .status(200)
      .json({ data: subcategory, message: "Subcategory updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating subcategory" });
  }
};

const deleteSubcategory = async (req, res) => {
  try {
    await productModel.removeSubcategory(req.params.id);
    res.status(200).json({ message: "Subcategory deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting subcategory" });
  }
};

// Unit Controllers
const renderAllUnits = async (req, res) => {
  try {
    const units = await productModel.getAllUnits();
    console.log("units:", units);
    res.status(200).json({ data: units, message: "All units fetched" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching all units" });
  }
};

const renderUnitById = async (req, res) => {
  try {
    const unit = await productModel.getUnitById(req.params.id);
    if (!unit) return res.status(404).json({ message: "Unit not found" });
    res.status(200).json({ data: unit, message: "Unit fetched by ID" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching unit by ID" });
  }
};

const createNewUnit = async (req, res) => {
  try {
    const unit = await productModel.createUnit(req.body.name);
    res.status(200).json({ data: unit, message: "New unit created" });
  } catch (error) {
    res.status(500).json({ message: "Error creating new unit" });
  }
};

const updateUnit = async (req, res) => {
  try {
    const unit = await productModel.updateUnit(req.params.id, req.body.name);
    res.status(200).json({ data: unit, message: "Unit updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating unit" });
  }
};

const deleteUnit = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("delete unit id: ", id);
    await productModel.removeUnit(id);
    res.status(200).json({ message: "Unit deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting unit" });
  }
};

module.exports = {
  // Product controllers
  renderAllProducts,
  renderProductById,
  createNewProduct,
  updateProduct,
  deleteProduct,

  // Category controllers
  renderAllCategories,
  renderCategoryById,
  createNewCategory,
  updateCategory,
  deleteCategory,

  // Subcategory controllers
  renderAllSubcategories,
  renderSubcategoryById,
  createNewSubcategory,
  updateSubcategory,
  deleteSubcategory,

  // Unit controllers
  renderAllUnits,
  renderUnitById,
  createNewUnit,
  updateUnit,
  deleteUnit,
};
