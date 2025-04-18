import React from "react";
import "./Footer.css";
import img4 from "../assets/foodylogo.png";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

const footerData = {
  newsletter: {
    logo: img4,
    text: "To get the latest news from us, please subscribe your email.",
  },
  contact: {
    title: "CONTACT US",
    details: ["@emo store United States.", "0123-456-789", "@emo@demo.com"],
  },
  products: {
    title: "PRODUCTS",
    items: [
      "Featured Product",
      "Bestseller Products",
      "Latest Products",
      "Special Products",
      "Toprated Products",
    ],
  },
  service: {
    title: "SERVICE",
    items: [
      "About Us",
      "Contact",
      "Information",
      "Privacy & Policy",
      "Terms & Conditions",
    ],
  },
  extra: {
    title: "EXTRA",
    items: ["Search", "News", "All Collections"],
  },
  bottom: {
    text: [
      "Fresh Vegetables | Fruits | Snacks And Foods | Cook: Fruits | Organic Staples | Seasonal Fruits Duis Sed Tinolone | Eget Pulvinar Jugee | Duplora Feiti | Juicio Venenatis | Fermentum Pulvinar",
      "© 2025. FreeSign-washboard Powered by [AIMI AUDION]",
    ],
  },
};

function Footer() {
  return (
    <div className="containercc">
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <img
              src={footerData.newsletter.logo}
              alt="icon"
              className="footer-logo"
            />
            <p>{footerData.newsletter.text}</p>
          </div>

          <div className="footer-section">
            <h2>{footerData.contact.title}</h2>
            {footerData.contact.details.map((detail, index) => (
              <p key={index}>{detail}</p>
            ))}
          </div>

          <div className="footer-section">
            <h2>{footerData.products.title}</h2>
            <ul>
              {footerData.products.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h2>{footerData.service.title}</h2>
            <ul>
              {footerData.service.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h2>{footerData.extra.title}</h2>
            <ul>
              {footerData.extra.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="social-media">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube />
          </a>
          <a
            href="https://whatsapp.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp />
          </a>
        </div>

        <div className="footer-bottom">
          {footerData.bottom.text.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </footer>
    </div>
  );
}

export default Footer;
