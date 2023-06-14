import React from "react";
import { Link } from 'react-router-dom'
import Navbar from '../navbar/navbar.js'
import { useState } from 'react'
import Modal from "../ModalLogin/Modal";
import { _get, _put } from '../utils/api.js'
import { useEffect } from 'react'
import petImage from '../images/peticon.jpg'
import jwt from "jwt-decode";
import { getToken } from "../utils/storage";
import styles from './favorites.module.css';
import Footer from "../footer/footer.js";
import { useNavigate } from "react-router-dom";
const Favorites = () => {
    const [ pressed, setPressed ] = useState(false);
    const [details, setDetails] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [items, setItems] = useState([])
    const [visible, setVisible] = useState(3)
    const [pets, setPets] = useState([])
    const [user, setUser] = useState(null);
    const history = useNavigate();

    useEffect(() => {
      const token = getToken("token");
      if (token) {
        const decodedToken = jwt(token);
        if (decodedToken) {
          setUser(decodedToken.id);
          getPets(decodedToken.id); // Fetch pets after setting the user ID
        } else {
          history('/accessdenied/accessdenied');
        }
      } else {
        history('/accessdenied/accessdenied');
      }
    }, []);
    
    const getPets = (userId) => {
      _get(`http://localhost:3001/pets/favorite/${userId}`)
        .then((response) => {
          if (response) {
            setPets(response.data.filter((pet) => pet !== null));
            console.log(response.data);
          } else {
            console.log("No pets found");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const showMorePets = () => {
      setVisible((prevValue) => prevValue + 3);
    }
    function scrollToWithEffect(to, duration) {
      const start = window.scrollY;
      const change = to - start;
      const increment = 20; // Adjust scroll speed here
    
      let currentTime = 0;
    
      function animateScroll() {
        currentTime += increment;
        const val = easeInOutQuad(currentTime, start, change, duration);
        window.scrollTo(0, val);
    
        if (currentTime < duration) {
          window.requestAnimationFrame(animateScroll);
        }
      }
    
      // Easing function
      function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      }
    
      animateScroll();
    }
  


    const removePetFromFavorites = (event, userId, petId) => {
      event.stopPropagation(); // Stop event propagation to prevent redirection
      _put(`http://localhost:3001/users/removeFavorite/${userId}/${petId}`)
        .then(() => {
          setPets((prevPets) => prevPets.filter((pet) => pet.id !== petId));
        })
        .catch((error) => {
          console.log(error);
        });
    };
    
    return(
        <div style={{backgroundColor:" #caa0a8"}}>
        <Navbar/>
        
        <div className={`container content ${styles.all}`} >
        <h2 style={{marginTop: "30px", marginBottom: "30px"}}>Favorites</h2>
      {pets.length == 0?<div>No pets found</div>:null}

        <div className="row products-row" style={{height:"unset"}}>
          {pets.slice(0, visible).map( (pet) => {
            return (
              <div className="col-lg-4" key={pet.id} onClick={() => { window.location.href = `/findapet/${pet.id}`; }}>
                
                <div className={`card ${styles.card}`}>
                  <div className={`img-wrap ${styles.image}`}>
                    <img src={pet.image || petImage} alt="" />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{pet.name}</h5>
                    <h5 className="card-title">{pet.breed} {pet.petCategory}</h5>
                    <p className="card-text">{pet.description}</p>
                    
                  </div>
                  <div className="d-flex justify-content-between align-items-center p-3 m-1">
                    </div>
                    <button onClick={(event)=>removePetFromFavorites(event, user,pet.id)} className={`btn btn-outline-danger ${styles.deleteBttn}`}>Remove from favorites</button>
                </div>
              {modalOpen && <Modal setOpenModal={setModalOpen} />}
              
              </div>
              
            )
          } )}
        </div>
        {visible<=pets.length && <button  onClick={showMorePets}>Load more</button> }
      </div>
      <button
        onClick={() => {
          scrollToWithEffect(0, 500);
        }}
        style={{
          position: 'fixed',
          padding: '1rem 2rem',
          fontSize: '20px',
          bottom: '40px',
          right: '40px',
          backgroundColor: '#21474b',
          color: '#fff',
          textAlign: 'center',
          width: '70px',
          
        }}
      >
        ↑
      </button>
        </div>
    )
}
export default Favorites;