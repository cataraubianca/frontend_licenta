import React, { useEffect } from "react";
import Navbar from "../navbar/navbar";
import { useState } from "react";
import { getToken } from "../utils/storage";
import { _get } from "../utils/api";
import jwt from "jwt-decode";
import styles from "./profile.module.css";
import petImage from '../images/download.png'
import { _put } from "../utils/api";
import { deleteToken } from "../utils/storage";
import { useNavigate } from "react-router-dom";
import PetCard from "./PetCard";
import Slider from "react-slick";
import Footer from "../footer/footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Profile = () => {
    const history = useNavigate()
  const [isTokenExists, setIsTokenExists] = useState(null);
  const [user, setUser] = useState({}); // Set initial value as an empty object
  const [newName, setNewName] = useState(false);
  const [name, setName] = useState();
  const [pets, setPets] = useState([]);

  const getPets = (id) => {
    _get(`http://localhost:3001/pets/findAllForUserId/${id}`)
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

  const getUser = async (id) => {
    await _get(`http://localhost:3001/users/user/${id}`).then(
      async (response) => {
        if (response) {
          setUser(response.data);
          console.log(response.data);
        }
      }
    );
  };
  const handleName = (e) => {
    setName(e.target.value);
}

const handleLogOut = () => {
    deleteToken();
    setIsTokenExists(false);
    history("/");
 }
  const handleNameChange = () =>{
    _put(`http://localhost:3001/users/changeName/${parseInt(isTokenExists)}/${name}`)
    setNewName(false);
    window.location.reload();
  }
  useEffect(() => {
    const token = getToken("token");

    if(token){
      const decodedToken = jwt(token);
    getUser(decodedToken.id);
    getPets(decodedToken.id);
    if (decodedToken) {
      setIsTokenExists(decodedToken.id);
    } 
    } else{history('/accessdenied/accessdenied')}
  }, []);
  var carouselSettings = {
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
    ]}
  return (
    <div style={{backgroundColor: "#c2bb9b"}}>
      <Navbar />
      <div className={styles.all}>
      <div className={styles.card}>
        <div className={styles.userInfo}>
          <div className={styles.icon}>
            <img src={petImage} alt="User Icon" />
          </div>
          <div className={styles.userDetails}>
            <div className={styles.cardTitle}>User Information</div>
            <div className={styles.cardContent}>Email: {user.email}</div>
            <div className={styles.cardContent}>Full Name: {user.full_name}</div>
            { newName ? 
            <><input onChange={handleName} placeholder="Enter your new name..."></input><button className={styles.editButton} onClick={() => handleNameChange()}>Save changes</button></>
            :<button className={styles.editButton} onClick={()=>setNewName(true)}>Edit name</button>
}
          </div>
        </div>
        <button id="logout-button" className={styles.logout} onClick={() => handleLogOut()}>Logout</button>
      </div>
      <div>
        {pets.length > 0 ?
          (<><h1 className={styles.cardTitle}>Your pets:</h1>
          <div className="carousel-container">
            {pets.length > 1 ? (
              <Slider {...carouselSettings}>
                {pets.map((pet) => (
                  <PetCard key={pet.id} pet={pet} />
                ))}
              </Slider>
            ) : null}
            {
              pets.length == 1 ? (
                <div style={{marginRight:"20px"}}>
                <PetCard  pet={pets[0]} />
                </div>
              ) : null
            }
          </div></>):(<div style={{textAlign:"center", marginLeft:"50vh", marginRight:"70vh", marginTop:"40vh"}}>You haven't posted any pets for adoption yet</div>)}
        </div>
      </div>
      <Footer />
    </div>
  );
};
