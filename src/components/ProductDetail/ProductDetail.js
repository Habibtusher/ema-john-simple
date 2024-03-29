import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey}=useParams();
    const [product, setProduct] = useState({});
    useEffect(() =>{
        fetch('https://aqueous-stream-49991.herokuapp.com/product/'+ productKey)
        .then(res => res.json())
        .then(data => setProduct(data))
    },[productKey])
    document.title="Product Detail"
    
    return (
        <div>
            <Product 
            showAddToCart={false} 
            product={product}
            > </Product>
        </div>
    );
};

export default ProductDetail;