import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import '../styles/Home.css';

function Home() {
  const [products, setProducts] = useState([]);

  // Pull products from the database
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8000/server/api/products.php');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="intro-container">
        <h1>Welcome to Cart Blanche</h1>
        <h3>Elevate your shopping experience.</h3><br />
        <a href="#products"><button className='shop-link'>Shop Now</button></a>
      </div>
      <div id='products'>
        <h1>Products</h1>
        <div className="product-grid">
          {products.map((product) => (
            <Link 
                to={`/products/${product._id}`}
                key={product._id}
                state={{ product }}
                className="product-card"
            >
              <h3>{product.name}</h3>
              <p>${product.price.toFixed(2)}</p>
              <p>{product.category}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;