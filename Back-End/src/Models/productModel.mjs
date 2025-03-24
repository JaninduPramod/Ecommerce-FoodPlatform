import execution from "../config/db.mjs";

// All Products Method
const getAllProducts = async () => {
  const query = "SELECT * FROM products";
  const products = await execution(query);
  if (products.length > 0) {
    return products;
  } else {
    return "false";
  }
};

// Create new User Method
const createProduct = async (newproduct) => {
  const params = {
    product_category: newproduct.product_category,
    product_name: newproduct.product_name,
    user_id: newproduct.user_id,
    product_price: newproduct.product_price,
  };

  const query = `
      INSERT INTO products (product_category, product_name, user_id,product_price) 
      VALUES (:product_category, :product_name, :user_id, :product_price)
    `;

  await execution(query, params);
};

export { getAllProducts, createProduct };
