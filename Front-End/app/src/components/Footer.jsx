import React from 'react';
import './Footer.css';
import img2 from '../assets/img3.png'; 
import img4 from '../assets/foodylogo.png'; 
import { Typography } from '@mui/material';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                {/* Newsletter Section */}
                <div className="footer-section">
                   <img src={img4} alt="icon" className="footer-logo" />
                    <form className="newsletter-form">
                       
                        
                    </form>
                    <p>To get the latest news from us, please subscribe your email.</p>
                </div>

                {/* Contact Us Section */}
                <div className="footer-section">
                    <h2>CONTACT US</h2>
                    <p>@emo store United States.</p>
                    <p>0123-456-789</p>
                    <p>@emo@demo.com</p>
                </div>

                {/* Products Section */}
                <div className="footer-section">
                    <h2>PRODUCTS</h2>
                    <ul>
                        <li>Featured Product</li>
                        <li>Bestseller Products</li>
                        <li>Latest Products</li>
                        <li>Special Products</li>
                        <li>Toprated Products</li>
                    </ul>
                </div>

                {/* Service Section */}
                <div className="footer-section">
                    <h2>SERVICE</h2>
                    <ul>
                        <li>About Us</li>
                        <li>Contact</li>
                        <li>Information</li>
                        <li>Privacy & Policy</li>
                        <li>Terms & Conditions</li>
                    </ul>
                </div>

                {/* Extra Section */}
                <div className="footer-section">
                    <h2>EXTRA</h2>
                    <ul>
                        <li>Search</li>
                        <li>News</li>
                        <li>All Collections</li>
                    </ul>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="footer-bottom">
                <p>
                    Fresh Vegetables | Fruits | Snacks And Foods | Cook: Fruits | Organic Staples | Seasonal Fruits | Bluevices Effective | Turgis Nic Tristique | Elementum Turgis | Duis Sed Tinolone |
                    Eget Pulvinar Jugee | Duplora Feiti | Juicio Venenatis | Fermentum Pulvinar
                </p>
                <p>© 2025. FreeSign-washboard Powered by [AIMI AUDION]</p>
            </div>
        </footer>
    );
}

export default Footer;