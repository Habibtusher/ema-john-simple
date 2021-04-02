import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItems from '../ReviewItems/ReviewItems';
import happy from '../../images/giphy.gif'
const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const history = useHistory();

    const handleProceedCheckout = () => {
        history.push('/shipment');

    }
    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch('http://localhost:5000/productsByKeys',{
            method: 'POST',
            headers:{ 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))
       
    }, [])
    let thank;
    if (orderPlaced) {
        thank = <img src={happy} alt=""></img>
    }

    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    cart.map(pd => 
                    <ReviewItems
                        product={pd}
                        key={pd.key}
                        removeProduct={removeProduct}
                    ></ReviewItems>)
                }
                {
                    thank
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}> <button onClick={handleProceedCheckout} className="button">Proceed Checkout</button> </Cart>             
            </div>
        </div>
    );
};

export default Review;