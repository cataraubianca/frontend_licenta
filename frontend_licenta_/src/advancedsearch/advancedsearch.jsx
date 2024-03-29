import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../navbar/navbar";
import FindPetComponent from "../findcomponent/findcomponent";
import CloseButton from 'react-bootstrap/CloseButton';
import { useState } from "react";
import styles from './advancedsearch.module.css'
import { _get } from "../utils/api";
import Modal from "../ModalLogin/Modal";
import petImage from '../images/peticon.jpg'
import { Link } from 'react-router-dom'
import Footer from "../footer/footer";
const AdvancedSearch = (props) =>  {
  const [modalOpen, setModalOpen] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [age, setAge] = useState(localStorage.getItem('age'));
  const [location,setLocation] = useState(localStorage.getItem('location'));
  const [type, setType] = useState(localStorage.getItem('type'));
  const [breed, setBreed] = useState(localStorage.getItem('breed'));
  const [pets, setPets] = useState([]);
  const [details, setDetails] = useState(false);
  const [visible, setVisible] = useState(3);
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
  const getPets = () => {
    _get(`http://localhost:3001/pets/advanced?state=${location}&petCategory=${type}&breed=${breed}&age=${age}`).then((response) => {
      if (response) {
          setPets(response.data)
          console.log(response.data);   
      } else {
          console.log("No pets found");
      }
  }).catch((err) => {
      console.log(err);
  }) 
  }
  useEffect(()=>{
    localStorage.removeItem('age')
    localStorage.removeItem('location')
    localStorage.removeItem('type')
    localStorage.removeItem('breed')
    getPets();
  },[])
  return (
    <div style={{ backgroundColor: "#c2bb9b", minHeight:"100%" }}>
      <Navbar />
      {pressed ? (
        <>
          <CloseButton onClick={() => setPressed(!pressed)} className={styles.findbutton} variant="black" />
          <FindPetComponent />
        </>
      ) : (
        <button className={styles.advancedbutton} onClick={() => {setPressed(!pressed)}}>Advanced search</button>
      )}

<div className={`container content ${styles.cont}`}>
        <div className="row products-row">
          {pets.slice(0, visible).map( (pet) => {
            return (
              <div className="col-lg-4" key={pet.id} onClick={() => { window.location.href = `/findapet/${pet.id}`; }}>
                
                <div className={`card ${styles.customCard}`}>
                  <div className={`img-wrap ${styles.customImgWrap}`}>
                    <img src={pet.image || petImage} alt="" />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{pet.name}</h5>
                    <h5 className="card-title">{pet.breed} {pet.petCategory}</h5>
                    <p className="card-text">{pet.description}</p>
                    
                  </div>
                  <div className="d-flex justify-content-between align-items-center p-3 m-1">
                    </div>
                </div>
              {modalOpen && <Modal setOpenModal={setModalOpen} />}
              
              </div>
              
            )
          } )}
        </div>
        {visible<pets.length && <button  onClick={showMorePets}>Load more</button> }
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
          marginBottom: '30px'
        }}
      >
        ↑
      </button>
      <Footer/>
    </div>
  );
}

export default AdvancedSearch;