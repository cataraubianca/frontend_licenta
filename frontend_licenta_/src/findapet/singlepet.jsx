import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import Navbar from '../navbar/navbar.js';
import { useState, useEffect } from 'react';
import { _get } from '../utils/api.js';
import petImage from '../images/peticon.jpg';
import ModalAdopt from '../modaladopt/modaladopt.js';
import styles from './singlepet.module.css';
import Footer from '../footer/footer.js';
import Modal from "../ModalLoginAdopt/ModalLoginAdopt";
import jwt from "jwt-decode";
import { getToken } from "../utils/storage";
const SinglePet = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { pathname } = useLocation();
  const [pets, setPets] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [user, setUser] = useState(null);
  const [role,setRole] = useState();
  const getPets = () => {
    _get('http://localhost:3001/pets')
      .then((response) => {
        if (response) {
          setPets(response.data);
          console.log(response.data);
        } else {
          console.log('No pets found');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPets();
    const token = getToken("token");
    if (token) {
      const decodedToken = jwt(token);
      setUser(decodedToken.id);
      setRole(getRole(decodedToken.id));
    }
  }, [])

  const handleAdopt = () => {
    if(user == null){
    setModalOpen2(true)
    }else{
      setModalOpen(true)
    }
  }

  const getRole = async (id) => {
    await _get(`http://localhost:3001/users/user-role/${id}`).then((shelters) => {
      if(shelters){
        setRole(shelters.data)
      }else{console.log("No resp")}
    }).catch ((e) =>{
      console.log(e)
    })
  }
  const singleProduct = pets.find((product) => product.id === parseInt(productId));
  const { id, name, description, age, state, petCategory, breed, userId, image } = singleProduct || {};

  return (
    <div style={{backgroundColor: "#c2bb9b", height:"100%", display:"flex", flexDirection:"column"}}>
          {modalOpen2 && <Modal setOpenModal={setModalOpen2} />}

      <Navbar />
      <div className={styles['pg-header']}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <h1 style={{display:"inline"}}>{name}</h1>
              {/* <p>{pathname}</p> */}
            </div>
            <div className="col-lg-5"></div>
          </div>
        </div>
      </div>
      <div className={`container ${styles.content}`}>
        <div className="row">
          <div className="col-lg-5">
            <img src={image || petImage} alt="" className={`img-fluid ${styles['img-fluid']}`} />
          </div>
          <div className="col-lg-7">
            <h2 className={styles.price}>
              <strong>{breed} {petCategory}</strong>
              {String(role)=="admin" ? <strong> / petId {id}, ownerId {userId}</strong> : null}

            </h2>
            <p className={styles.price}>
              <strong>Location: {state}</strong>
            </p>
            <p>{description}</p>

            <br />
            <button className={`btn btn-primary btn-sm ${styles.btn}`} onClick={() => navigate(-1)}>
              BACK
            </button>{' '}
            &nbsp;
            <button className={`btn btn-primary btn-sm ${styles.btn}`} onClick={() => handleAdopt()}>
              Adopt now
            </button>{' '}
            {modalOpen && <ModalAdopt id={id} setOpenModal={setModalOpen} />}
            &nbsp;
            <Link to="/findapet/findapet" className={`btn btn-primary btn-sm ${styles.btn}`}>
              All pets
            </Link>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default SinglePet;
