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

export { getAllProducts };
