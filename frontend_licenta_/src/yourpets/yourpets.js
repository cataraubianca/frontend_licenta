import React from "react";
import { Link } from 'react-router-dom'
import Navbar from '../navbar/navbar.js'
import { useState } from 'react'
import Modal from "../ModalLogin/Modal";
import { _delete, _get } from '../utils/api.js'
import { useEffect } from 'react'
import petImage from '../images/peticon.jpg'
import jwt from "jwt-decode";
import { getToken } from "../utils/storage";
import { useNavigate } from "react-router-dom";
const YourPets = () => {
    const history = useNavigate()
    const [ pressed, setPressed ] = useState(false);
    const [details, setDetails] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [items, setItems] = useState([])
    const [visible, setVisible] = useState(3)
    const [pets, setPets] = useState([])
    const [user, setUser] = useState(jwt(getToken("token")).id);
    const [refresh, setRefresh] = useState(0);
    
    const showMorePets = () => {
      setVisible((prevValue) => prevValue + 3);
    }
    //http://localhost:3001/pets/findAllForUserId/${user}
    const getPets = () => {
      _get(`http://localhost:3001/pets/findAllForUserId/${user}`).then((response) => {
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
  
    useEffect(()=>{

    },[refresh])
    useEffect(() => {
      getPets();
      console.log("User->",user)
    }, [])

    const deletePet = (petId) => {
        _delete(`http://localhost:3001/pets/${petId}`)
        setRefresh(refresh+1)
    }
    const redirect = (petId) => {
        history(`/editpet/:${petId}`)
    }
    return(
        <>
        <Navbar/>
        <div className="container content">
        <div>Your pets posted for adoption</div>
        <div className="row products-row">
          {pets.slice(0, visible).map( (pet) => {
            return (
              <div className="col-lg-4" key={pet.id}>
                
                <div className="card">
                  <div className="img-wrap">
                    <img src={pet.image || petImage} alt="" />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{pet.name}</h5>
                    <h5 className="card-title">{pet.breed} {pet.petCategory}</h5>
                    <p className="card-text">{pet.description}</p>
                    
                  </div>
                  <div className="d-flex justify-content-between align-items-center p-3 m-1">
                      <Link to={`/findapet/${pet.id}`} className="btn btn-primary btn-sm" onClick={() => setDetails(true)}>DETAILS &#8594;</Link>
                    </div>
                    <Link to={`/editpet/${pet.id}`} onClick={()=>setDetails(true)} className="btn btn-outline-warning">Edit pet details</Link>
                    <button onClick={()=>deletePet(pet.id)} className="btn btn-outline-danger">Delete pet</button>
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
        </>
    )
}
export default YourPets;