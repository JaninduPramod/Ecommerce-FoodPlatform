import React from 'react';
import './Card.css';
import img2 from '../assets/img3.png'; 
console.log('Imported Image:', img2);
import { Typography } from '@mui/material';

function Card({ state,image, title, description, price, options, quantity, onQuantityChange, onAddToCart }) {
   
    
    return (
        <div className="card">
            <p className="card-state">{state}</p>
            <img src={image ? image : img2} alt={title} className="card-image" />
            <div className="card-content">
                <p className="card-title">{title}</p>
              

                <div className="card-description">
                    <Typography noWrap>{description}</Typography>  
                </div>

                <p className="card-price">${price.toFixed(2)}</p>
                <div className="card-options">
                    {options.map((option, index) => (
                        <span key={index}>{option}</span>
                    ))}
                </div>
                <div className="card-button-quantity">
                <div className="card-quantity">
                    <label htmlFor="quantity">Qty</label>
                    <input
                        type="number"
                        id="quantity"
                        value={quantity}
                        onChange={onQuantityChange}
                        min="1"
                    />
                </div>
                <button className="card-button" onClick={onAddToCart}>ADD TO CART</button>
            </div>
            </div>
        </div>
    );
}



export default Card;