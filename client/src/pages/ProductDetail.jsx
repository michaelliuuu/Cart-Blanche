import { useLocation } from 'react-router-dom';
import '../styles/ProductDetail.css'

function ProductDetail() {
  const { state } = useLocation();
  const product = state?.product;
  
  return (
    <><div className='productdetail-container'>
        <div className="product-detail">
            <p>**Add picture here**</p>
          
        </div>
        <div className='product-checkout'>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <hr />
            <p>${product.price?.toFixed(2)}</p>
            <hr />
            <p>Colors: <br />{product.colors?.join(' ')}</p>
            <hr />
            <p>Sizes: <br />{product.sizes?.join(' ')}</p>
            <hr />
            <button>Add to cart</button>
        </div>
    </div></>
  );
}

export default ProductDetail;