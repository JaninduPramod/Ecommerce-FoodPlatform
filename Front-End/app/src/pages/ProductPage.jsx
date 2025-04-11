import React, { useState } from "react";
import "./ProductPage.css";
import Card from "../components/Card"; 
import CardImg from "../assets/img3.png";

const categories = [
  { name: "Tomato", count: 12 },
  { name: "Avocado", count: 11, subcategories: [
      { name: "Banana", count: 8 },
      { name: "Potato", count: 2 }
    ] },
  { name: "Orange", count: 6 },
  { name: "Apple", count: 7 },
  { name: "Pumpkin", count: 5 },
  { name: "Cabbage", count: 6 },
  { name: "Broccoli", count: 8 },
  { name: "Mango", count: 0 }
];

const products = Array.from({ length: 20 }, (_, index) => ({
  id: index,
  state: index % 2 === 0 ? "Sold Out" : "Available",
  image: CardImg,
  title: "Organic Fruits",
  description: "Kitchen Spices - Fresh and Healthy",
  price: 904.0,
  options: ["3 kg", "7 kg"],
  quantity: 1 
}));

const ProductPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= Math.ceil(products.length / productsPerPage)) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="product-flex">
    <div className="product-page">
      {/* Sidebar */}
      <aside className="sidebar">
        <h3 className="sidebar-title">CATEGORY</h3>
        <ul>
          {categories.map((cat, idx) => (
            <li key={idx}>
              <span className={cat.count > 0 ? "category-active" : ""}>
                {cat.name} ({cat.count})
              </span>
              {cat.subcategories && (
                <ul>
                  {cat.subcategories.map((sub, subIdx) => (
                    <li key={subIdx} className="subcategory">
                      - {sub.name} ({sub.count})
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </aside>

      {/* Product Grid */}
      <div className="card-container3">
        {currentProducts.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>
    
    
     
    </div>
    <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        priv
        
        </button>
        <span> Page {currentPage} of {Math.ceil(products.length / productsPerPage)} </span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={indexOfLastProduct >= products.length}>
          next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;