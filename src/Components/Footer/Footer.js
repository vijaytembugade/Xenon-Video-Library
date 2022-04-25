import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="site-declaration flex-container">
        <div className="sitelogo">
          <img src="/assets/logo.png" alt="logo" />
        </div>
        <div className="site-map">
          <h3>Sitemap</h3>
          <ul>
            <li>Home</li>
            <li>Videos</li>
            <li>Liked Videos</li>
            <li>Watched Videos</li>
            <li>History</li>
          </ul>
        </div>
      </div>

      <div className="flex-container-verticle">
        <div>
          <strong>
            Made with 💖 by <span className="danger-text">Vijay Tembugade</span>
          </strong>
        </div>
        <div className="social-media-icons">
          <a href="https://github.com/vijaytembugade/" target="_blank">
            <img src="/assets/social/github.svg" alt="" />
          </a>
          <a href="https://twitter.com/vijaytembugade" target="_blank">
            <img src="/assets/social/twitter.svg" alt="" />
          </a>
          <a href="https://www.linkedin.com/in/vijaytembugade/" target="_blank">
            <img src="/assets/social/linkedin.svg" alt="" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
