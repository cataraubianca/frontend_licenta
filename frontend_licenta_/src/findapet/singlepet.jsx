import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import PRODUCTS from '../data.js';
import Navbar from '../navbar/navbar.js';
import { useState, useEffect } from 'react';
import { _get } from '../utils/api.js';
import petImage from '../images/peticon.jpg';
import ModalAdopt from '../modaladopt/modaladopt.js';
const SinglePet = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { pathname } = useLocation();
  const [pets, setPets] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
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
  }, []);

  // get product
  const singleProduct = pets.find((product) => product.id === parseInt(productId));

  // Check if singleProduct is defined before destructuring its properties
  const { id, name, description, age, state, petCategory, breed } = singleProduct || {};

  return (
    <main>
      <Navbar />
      <div className="pg-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <h1>{name}</h1>
              {/* <p>{pathname}</p> */}
            </div>
            <div className="col-lg-5"></div>
          </div>
        </div>
      </div>
      <div className="container content">
        <div className="row">
          <div className="col-lg-5">
            <img src={petImage} alt="" className="img-fluid" />
          </div>
          <div className="col-lg-7">
            <h2 className="price">
              <strong>{breed} {petCategory}</strong>
            </h2>
            <p className="price">
              <strong>Location: {state}</strong>
            </p>
            <p>{description}</p>

            <br />
            <button className="btn btn-primary btn-sm" onClick={() => navigate(-1)}>
              BACK
            </button>{' '}
            &nbsp;
            <button className="btn btn-primary btn-sm" onClick={() => setModalOpen(true)}>
              Adopt now
            </button>{' '}
            {modalOpen && <ModalAdopt id={id} setOpenModal={setModalOpen} />}
            &nbsp;
            <Link to="/findapet/findapet" className="btn btn-primary btn-sm">
              All pets
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SinglePet;
