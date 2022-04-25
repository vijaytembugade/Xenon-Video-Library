import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-styled-carousel";
import "./MainCarousel.css";

const MainCarousel = () => {
  const responsive = [
    { breakPoint: 2400, cardsToShow: 1 },
    { breakPoint: 1280, cardsToShow: 1 },
    { breakPoint: 760, cardsToShow: 1 },
    { breakPoint: 480, cardsToShow: 1 },
    { breakPoint: 320, cardsToShow: 1 },
  ];
  return (
    <>
      <Slider
        responsive={responsive}
        pauseOnMouseOver={true}
        autoSlide={3000}
        infinite={true}
        showArrows={false}
      >
        <div>
          <img
            className="carousel-img"
            src="/assets/carousel/Jaun-Elia.jpg"
            alt="jaun elia"
          />
        </div>
        <div>
          <img
            className="carousel-img"
            src="/assets/carousel/faiz-ahmed.jpg"
            alt="faiz ahamed faiz"
          />
        </div>
        <div>
          <img
            className="carousel-img"
            src="/assets/carousel/piyush-mishra.jpg"
            alt="piyush mishra"
          />
        </div>

        <div>
          <img
            className="carousel-img"
            src="/assets/carousel/Rahat-indori.jpg"
            alt="rahat indori"
          />
        </div>
        <div>
          <img
            className="carousel-img"
            src="/assets/carousel/wasim-barewali.jpg"
            alt="wasim barelvi"
          />
        </div>
      </Slider>
      <Link to="/videos" className="carousel-text">
        Explore the journey of Poetry and Music
      </Link>
    </>
  );
};

export default MainCarousel;
