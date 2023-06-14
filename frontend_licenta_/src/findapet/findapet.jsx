import { Link } from 'react-router-dom'
import PRODUCTS from '../data.js'
import FindPetComponent from '../findcomponent/findcomponent.js'
import Navbar from '../navbar/navbar.js'
import { useState } from 'react'
import CloseButton from 'react-bootstrap/CloseButton';
import styles from './findapet.module.css'
import Modal from "../ModalLogin/Modal";
import { _get, _put } from '../utils/api.js'
import { useEffect } from 'react'
import petImage from '../images/peticon.jpg'
import jwt from "jwt-decode";
import { getToken } from "../utils/storage";
import Footer from '../footer/footer.js'
import { minHeight } from '@mui/system'

const FindAPet = () => {
  const [pressed, setPressed] = useState(false);
  const [details, setDetails] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [items, setItems] = useState([])
  const [visible, setVisible] = useState(3)
  const [pets, setPets] = useState([])
  const [imageName, setImageName] = useState();
  const [user, setUser] = useState(null); // Initialize user state with null
  const [allData, setAllData] = useState([]);
  const [input, setInput] = useState("");
  const [petsFiltered, setPetsFiltered] = useState([]);
  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const showMorePets = () => {
    setVisible((prevValue) => prevValue + 3);
  }

  const getPets = () => {
    _get("http://localhost:3001/pets").then(async(response) => {
      if (response) {
        setPets(response.data)
        console.log(response.data);
      }
    })
  }
  const handleSearch = (text) => {
    _get(`http://localhost:3001/pets/description/${text}`).then(async(response) => {
      if (response) {
        setPets(response.data)
        console.log("Filtrate",response.data);
      }
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

  useEffect(() => {
    getPets();
    const token = getToken("token");
    if (token) {
      const decodedToken = jwt(token);
      setUser(decodedToken.id);
    }
  }, [])

  const addToFavorites = (event, petId) => {
    event.stopPropagation(); // Stop event propagation to prevent redirection
    if(user==null){setModalOpen(true)}else{
    _put(`http://localhost:3001/users/favorite/${user}/${petId}`);}
  };

  return (
    <div style={{ backgroundColor: "#c2bb9b", minHeight:"100%"}}>
          {modalOpen && <Modal setOpenModal={setModalOpen} />}
      <Navbar />
      {pressed ?
        <>
          <CloseButton onClick={() => setPressed(!pressed)} className={styles.findbutton} variant="black" />
          <FindPetComponent />
        </>
        : <button className={styles.advancedbutton} onClick={() => { setPressed(!pressed) }}>Advanced search</button>}
        <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Enter description"
        className={styles.ss}
      />
      <button onClick={()=>handleSearch(input)}>Search</button>
      <div className={`container content ${styles.cont}`}>
        <div className="row products-row">
          {pets.slice(0, visible).map((pet) => {
            return (
              <div className="col-lg-4" key={pet.id} onClick={() => { window.location.href = `/findapet/${pet.id}`; }}>
                <div className={`card ${styles.customCard}`}>
                  <div className={`img-wrap ${styles.customImgWrap}`}>
                    <img src={pet.image || petImage} alt="" />
                  </div>
                  <div className={`card-body ${styles.customCardBody}`}>
                    <h5 className={`card-title ${styles.customCardTitle}`}>{pet.name}</h5>
                    <h5 className={`card-title ${styles.customCardTitle}`}>
                      {pet.breed} {pet.petCategory}
                    </h5>
                    <p className={`card-text ${styles.customCardText}`}>{pet.description}</p>
                  </div>
                  <button
                  className={`${styles.love} ${styles.customLoveBtn}`}
                  onClick={(event) => addToFavorites(event, pet.id)}
                  >
                &#10084;
                </button>

                  <div className="d-flex justify-content-between align-items-center p-3 m-1">
                  </div>
                </div>
                {modalOpen && <Modal setOpenModal={setModalOpen} />}
              </div>
            );
          })}
        </div>
        {visible < pets.length && <button style={{ marginBottom: "40px" }} onClick={showMorePets}>Load more</button>}
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
      {pets.length ==0 ? <div>No pets found</div>:null}
      
    </div>
  );
}

export default FindAPet;
