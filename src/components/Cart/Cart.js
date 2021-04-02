import React from 'react';


const Cart = (props) => {
    const cart = props.cart;
    //const total = cart.reduce((total,prd)=>total + prd.price,0);
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity || 1;
    }
    console.log(total);
    let shipping = 0;
    if (total > 35) {
        shipping = 0
    }
    else if (total > 0) {
        shipping = 0;
    }
    else if (total > 15) {
        shipping = 4.99;
    }
    const tax = (total / 10).toFixed(2);
    const grandTotal = (total + shipping + Number(tax)).toFixed(2);
    return (
        <div>
            <h2 className="text-danger">Order Summary</h2>
            <h4>Items Order :{cart.length}</h4>
            <p>Shipping Cost:${shipping}</p>
            <p>Product Price :{total}</p>
            <p>Tax :{tax}</p>
            <p>Total Price :${grandTotal}</p>   
            {
                props.children
            }
           
        </div>
    );
};

export default Cart;