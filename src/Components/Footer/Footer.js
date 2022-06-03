import React from "react";
import { Link } from "react-router-dom";
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
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/videos">Videos</Link>
            </li>
            <li>
              <Link to="/likes">Liked Videos</Link>
            </li>
            <li>
              <Link to="/history">Watched Videos</Link>
            </li>
            <li>
              <Link to="/my-playlis">Playlist</Link>{" "}
            </li>
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
            <img src="/assets/social/github.svg" alt="github" />
          </a>
          <a href="https://twitter.com/vijaytembugade" target="_blank">
            <img src="/assets/social/twitter.svg" alt="twitter" />
          </a>
          <a href="https://www.linkedin.com/in/vijaytembugade/" target="_blank">
            <img src="/assets/social/linkedin.svg" alt="linkedin" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
