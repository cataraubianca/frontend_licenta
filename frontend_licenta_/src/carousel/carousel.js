import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import ProductCard from "./pet.js";
import { _get } from "../utils/api.js";
import petImage from '../images/download.png'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carousel.css";

const ProductSlider = () => {
  const [pets, setPets] = useState([]);

  const getPets = () => {
    _get("http://localhost:3001/pets/random8")
      .then((response) => {
        if (response) {
          setPets(response.data);
          console.log(response.data);
        } else {
          console.log("No pets found");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      }
    ]
  };

  useEffect(() => {
    getPets();
  }, []);
  return (
    <div>
      <Slider {...settings}>
        {pets.map((pet) => {
          return (
            <div key={pet}>
              <ProductCard imgSrc={pet.image || petImage} key={pet.id} pet={pet}/>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default ProductSlider;
