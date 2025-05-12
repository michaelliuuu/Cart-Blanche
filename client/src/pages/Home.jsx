import { Link } from "react-router-dom";
import '../styles/Home.css'

function Home() {
    const products = [{
        id: 1,                   // Unique identifier (required for React keys)
        name: "T-Shirt",
        price: 29.99,            // Number type for calculations
        image: "/images/tshirt.jpg", // Image path/URL
        description: "100% organic cotton, unisex fit",
        category: "clothing",
        inStock: true,
        rating: 4.5,             // For reviews/stars
        colors: ["white", "black", "navy"], // Available variants
        sizes: ["S", "M", "L"]   // Size options
    }, {
        id: 2,                   // Unique identifier (required for React keys)
        name: "Pants",
        price: 10.99,            // Number type for calculations
        image: "/images/tshirt.jpg", // Image path/URL
        description: "100% organic cotton, unisex fit",
        category: "clothing",
        inStock: true,
        rating: 4.5,             // For reviews/stars
        colors: ["white", "black", "navy"], // Available variants
        sizes: ["S", "M", "L"]   // Size options
    }, {
        id: 3,                   // Unique identifier (required for React keys)
        name: "Placeholder",
        price: 29.99,            // Number type for calculations
        image: "/images/tshirt.jpg", // Image path/URL
        description: "100% organic cotton, unisex fit",
        category: "clothing",
        inStock: true,
        rating: 4.5,             // For reviews/stars
        colors: ["white", "black", "navy"], // Available variants
        sizes: ["S", "M", "L"]   // Size options
    }, {
        id: 4,                   // Unique identifier (required for React keys)
        name: "Placeholder",
        price: 29.99,            // Number type for calculations
        image: "/images/tshirt.jpg", // Image path/URL
        description: "100% organic cotton, unisex fit",
        category: "clothing",
        inStock: true,
        rating: 4.5,             // For reviews/stars
        colors: ["white", "black", "navy"], // Available variants
        sizes: ["S", "M", "L"]   // Size options
    }, {
        id: 5,                   // Unique identifier (required for React keys)
        name: "Placeholder",
        price: 29.99,            // Number type for calculations
        image: "/images/tshirt.jpg", // Image path/URL
        description: "100% organic cotton, unisex fit",
        category: "clothing",
        inStock: true,
        rating: 4.5,             // For reviews/stars
        colors: ["white", "black", "navy"], // Available variants
        sizes: ["S", "M", "L"]   // Size options
    }, {
        id: 6,                   // Unique identifier (required for React keys)
        name: "Placeholder",
        price: 29.99,            // Number type for calculations
        image: "/images/tshirt.jpg", // Image path/URL
        description: "100% organic cotton, unisex fit",
        category: "clothing",
        inStock: true,
        rating: 4.5,             // For reviews/stars
        colors: ["white", "black", "navy"], // Available variants
        sizes: ["S", "M", "L"]   // Size options
    }, {
        id: 7,                   // Unique identifier (required for React keys)
        name: "Placeholder",
        price: 29.99,            // Number type for calculations
        image: "/images/tshirt.jpg", // Image path/URL
        description: "100% organic cotton, unisex fit",
        category: "clothing",
        inStock: true,
        rating: 4.5,             // For reviews/stars
        colors: ["white", "black", "navy"], // Available variants
        sizes: ["S", "M", "L"]   // Size options
    }, {
        id: 8,                   // Unique identifier (required for React keys)
        name: "Placeholder",
        price: 29.99,            // Number type for calculations
        image: "/images/tshirt.jpg", // Image path/URL
        description: "100% organic cotton, unisex fit",
        category: "clothing",
        inStock: true,
        rating: 4.5,             // For reviews/stars
        colors: ["white", "black", "navy"], // Available variants
        sizes: ["S", "M", "L"]   // Size options
    }];

    return (
        <><div className="intro-container">
            <h1>Welcome to Cart Blanche</h1>
            <h3>Elevate your shopping experience.</h3><br />
            <a href="#products"><button className='shop-link'>Shop Now</button></a>
        </div>
        <div id='products'>
            <h1>Products</h1>
            {/* <div class="dropdown">
                <button onclick="myFunction()" class="dropbtn">Dropdown</button>
                <div id="myDropdown" class="dropdown-content">
                    <input type="text" placeholder="Search.." id="myInput" onkeyup="filterFunction()"></input>
                    <a href="#about">Shirt</a>
                    <a href="#base">Pants</a>
                </div>
            </div> */}
            <div className="product-grid">
                {products.map((product) => (
                    <Link to={`/products/${product.id}`} key={ product.id } state={ product } className="product-card">
                        <h3>{product.name}</h3>
                        <p>${product.price.toFixed(2)}</p>
                    </Link>
                ))}
            </div>
        </div></>
    );
}

export default Home;