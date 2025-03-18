import React from 'react';
import './Card2.css';
import img2 from '../assets/img3.png'; 
import img3 from '../assets/eye-solid.svg'; 
import { Typography } from '@mui/material';

function Card({ state, image, title, description, price, options, quantity, onQuantityChange, onAddToCart }) {
    return (
        <div className="card-outer2">
        <div className="card2">
        <div className="card2-flex">
            <p className="card2-state">{state}</p>
            <img src={img3} alt="icon" className="card2-icon" />
            <img src={image ? image : img2} alt={title} className="card2-image" />
            </div >

            <div className="card2-content">
          <p className="card2-title">{title}</p>

                <div className="card2-description">
                    <Typography noWrap>{description}</Typography>  
                </div>

                <p className="card2-price">${price ? price.toFixed(2) : "0.00"}</p>
                <div className="card2-options">
                    {options.map((option, index) => (
                        <span key={index}>{option}</span>
                    ))}
                </div>
                <div className="card2-button-quantity">
                    <div className="card2-quantity">
                        <label htmlFor="quantity">Qty</label>
                        <input
                            type="number"
                            id="quantity"
                            value={quantity}
                            onChange={onQuantityChange}
                            min="1"
                        />
                    </div>
                    <button className="card2-button" onClick={onAddToCart}>ADD TO CART</button>
                </div>
            </div>
        </div>
        </div>
    );
}

export default Card;
