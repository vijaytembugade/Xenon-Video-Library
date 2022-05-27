import React from "react";
import "./Homepage.css";
import MainCarousel from "../../Components/MainCarousel/MainCarousel";
import { Link, useNavigate } from "react-router-dom";
import SubCarousel from "../../Components/SubCarousel/SubCarousel";
import { useFilter } from "../../Contexts";
import { BY_CATEGORY } from "../../Constants";

const Homepage = () => {
  const { dispatch, allCategories } = useFilter();
  const navigate = useNavigate();
  return (
    <div>
      <div className="main-page">
        <MainCarousel />
      </div>

      <div className="flex-container-verticle classic-bg-color mr-1">
        <span>
          A collection of soulful mushairas and open mic, available at one
          place.
        </span>
        <span>Dawn to dusk with legends of an Era.</span>
        <Link to="/videos">
          <button className="btn btn-primary">Click here to explore</button>
        </Link>
      </div>

      <div>
        <h1 className="center-text">Some writers and poets</h1>
        <SubCarousel />
      </div>

      <div>
        <h1 className="center-text">Our Entertainment Partners</h1>
        <div className="partners">
          <img
            src="https://rekhtafoundation.org/wp-content/uploads/2017/07/rekhtaFoundationFacebookHome.png"
            alt="rekhta"
          />
          <img
            src="https://assets-in.bmscdn.com/nmcms/events/banner/mobile/media-mobile-sukhan-a-mehfil-of-urdu-literature-sufi-music-2019-5-6-t-16-54-21.jpg"
            alt="rekhta"
          />
          <img
            src="https://www.india-forums.com/bollywood/images/uploads/BC3_mirchi.jpg"
            alt="rekhta"
          />
          <img
            src="https://mir-s3-cdn-cf.behance.net/projects/404/cee19923767743.54e4291233c14.jpg"
            alt="rekhta"
          />
        </div>
      </div>

      <div>
        <h1 className="center-text">Categories</h1>
        <div className="category-container">
          {allCategories.map((category) => {
            return (
              <div
                key={category._id}
                onClick={() => {
                  dispatch({
                    type: BY_CATEGORY,
                    payload: category.categoryName,
                  });
                  navigate("videos");
                }}
              >
                <span>{category.categoryName}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
