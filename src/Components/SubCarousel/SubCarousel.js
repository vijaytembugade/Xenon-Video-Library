import React from "react";
import Slider from "react-styled-carousel";
import "./SubCarousel.css";

const writersData = [
  {
    name: "Zakir Khan",
    image:
      "https://res.cloudinary.com/purnesh/image/upload/w_1000,f_auto/zakir-khan.jpg",
  },
  {
    name: "Rahat Indori",
    image:
      "https://s3.ap-southeast-1.amazonaws.com/images.deccanchronicle.com/dc-Cover-v2midumnlitrctq263381kqlj5-20200904163925.Medi.jpeg",
  },
  {
    name: "Waseem Barelvi",
    image:
      "https://poetistic.com/images/writersProfile/$2y$10$idHJQFgY6rYWJ507kTdm5u0ohNwTfywnxP42i7qNwFBnE18RIyAZq1.jpg",
  },
  {
    name: "Jaun Elia",
    image:
      "https://spiderimg.amarujala.com/assets/images/2022/01/07/750x506/urdu-adab_1641560661.jpeg",
  },
  {
    name: "Qamar Ejaz",
    image: "https://i.ytimg.com/vi/Lx0KYtQMY1c/maxresdefault.jpg",
  },
  {
    name: "Piyush Mishra",
    image: "https://images.indianexpress.com/2022/01/piyush1200.jpg",
  },
  {
    name: "Javed Akhtar",
    image:
      "https://harpercollins.co.in/wp-content/uploads/2016/01/Javed-Akhtar.jpg",
  },
  {
    name: "Manoj Muntashir",
    image: "https://jantaserishta.com/h-upload/2021/05/03/1040520-39.webp",
  },
];

const SubCarousel = () => {
  const responsive = [
    { breakPoint: 2400, cardsToShow: 6 },
    { breakPoint: 1280, cardsToShow: 4 },
    { breakPoint: 768, cardsToShow: 3 },
    { breakPoint: 480, cardsToShow: 2 },
    { breakPoint: 320, cardsToShow: 1 },
  ];
  return (
    <div>
      <Slider
        responsive={responsive}
        pauseOnMouseOver={true}
        autoSlide={false}
        infinite={false}
        showArrows={true}
        padding="20px"
      >
        {writersData.map((photo, index) => {
          return (
            <div className="sub-carousel" key={index}>
              <img
                className="subcarousel-img"
                src={photo.image}
                alt={photo.name}
              />
              <p className="sub-carousel-name">{photo.name}</p>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default SubCarousel;
