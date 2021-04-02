import React from 'react';

const ReviewItems = (props) => {
    const reviewItemStyle = {
        borderBottom: '2px solid lightgray',
        marginBottom: '5px',
        paddingBottom: '5px',
        marginLeft:'200px',
        width: '600px'
    }
    const { name, quantity,key,price,img } = props.product;
    return (
        <div className=" m-0 d-flex" style={reviewItemStyle}>
            <div>
            <img src={img} alt=""/>
            </div>
            <div className="ml-5">
            <h5 className="product-name">Name : {name}</h5>
            <p> Quantity :{quantity}</p>
            <p><small>Price $:{price}</small></p>
            <button 
                onClick={() =>props.removeProduct(key)} 
                className="button"
            >Remove</button>
            </div>
           
        </div>
    );
};

export default ReviewItems;