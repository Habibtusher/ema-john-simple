import React, { useEffect, useState } from 'react';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
const Shop = () => {
    const [products, setProduct] = useState([]);
    document.title = "Shop More"
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('https://aqueous-stream-49991.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [])


    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
    
        fetch('https://aqueous-stream-49991.herokuapp.com/productsByKeys',{
            method: 'POST',
            headers:{ 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))
      
    }, []);

    const handleAddProduct = (product) => {
        console.log(cart);
        const toBeAdded = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAdded);

        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAdded);
            newCart = [...others, sameProduct];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product]
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count)
    }


    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    products.length === 0 && <CircularProgress />
                }
                {
                    products.map(pd => <Product
                        key={pd.key}
                        showAddToCart={true}
                        handleAddProduct={handleAddProduct}
                        product={pd}>
                    </Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}> <Link to='/review'> <button className="button">Review</button>  </Link>   </Cart>
            </div>
        </div>
    );
};

export default Shop;