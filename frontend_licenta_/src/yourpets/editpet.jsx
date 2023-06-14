import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import Navbar from '../navbar/navbar.js';
import { useState, useEffect } from 'react';
import { _get, _put } from '../utils/api.js';
import petImage from '../images/peticon.jpg';
import { States } from "./enum.ts";
import { petCategory as myPetCategory } from "./enum.ts";
import { CatBreed } from "./enum.ts";
import { RabbitBreed } from "./enum.ts";
import { DogBreed } from "./enum.ts";
import { FishBreed } from "./enum.ts";
import { BirdBreed } from "./enum.ts";
import { HorseBreed } from "./enum.ts";
import { Age } from "./enum.ts";
import { storage } from "../firebase";
import Footer from '../footer/footer.js';
import styles from './editpet.module.css';
import jwt from "jwt-decode";
import { getToken } from "../utils/storage";
const EditPet = () => {
  const navigate = useNavigate();
  const history = useNavigate();
  const { productId } = useParams();
  const { pathname } = useLocation();
  const [pets, setPets] = useState([]);
  const [edit, setEdit] = useState(false);
  const [namee,setNamee] = useState();
  const [typee, setTypee] = useState()
  const [breedd, setBreedd] = useState()
  const [locationn, setLocationn] = useState()
  const [descriptionn, setDescriptionn] = useState();
  const [ showDogs, setShowDogs ] = useState(false);
  const [ showCats, setShowCats ] = useState(false);
  const [ showRabbits, setShowRabbits ] = useState(false);
  const [ showHorses, setShowHorses ] = useState(false);
  const [ showBirds, setShowBirds ] = useState(false);
  const [ showFish, setShowFish ] = useState(false);
  const [agee, setAgee] = useState()
  const [image, setImage] = useState()
  const [url, setURL] = useState()
  const [isToken, setIsToken] = useState(null);
  const [role, setRole] = useState();

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


const handlePetType = (event) => {
  if(event.target.value=='dog'){setDogs()}
  if(event.target.value=='cat'){setCats()}
  if(event.target.value=='rabbit'){setRabbits()}
  if(event.target.value=='bird'){setBirds()}
  if(event.target.value=='horse'){setHorses()}
  if(event.target.value=='fish'){setFish()}


}



const ageOptions = Object.values(Age).map((age) => (
    <option key={age} value={age}>{age}</option>
));

const handleAgeUpdate = (event) => {
  setAgee(event.target.value)
  console.log(event.target.value)
}
const handleAgeChange = () => {
  _put(`http://localhost:3001/pets/changeAge/${id}/${agee}`)
  window.location.reload()

}



const locationOptions = Object.values(States).map((location) => (
  <option key={location} value={location}>{location}</option>
));

const handleLocationUpdate = (event) => {
  setLocationn(event.target.value)
  console.log(event.target.value)
}
//http://localhost:3001/pets/changeLocation/1?state=Colorado
const handleLocationChange = () => {
  _put(`http://localhost:3001/pets/changeLocation/${id}?state=${locationn}`)
  window.location.reload()

}




const typeOptions = Object.values(myPetCategory).map((type) => (
  <option key={type} value={type}>{type}</option>
));
const catBreedOptions = Object.values(CatBreed).map((breed) => (
  <option key={breed} value={breed}>{breed}</option>
));
const rabbitBreedOptions = Object.values(RabbitBreed).map((breed) => (
  <option key={breed} value={breed}>{breed}</option>
));

const dogBreedOptions = Object.values(DogBreed).map((breed) => (
  <option key={breed} value={breed}>{breed}</option>
));
const fishBreedOptions = Object.values(FishBreed).map((breed) => (
  <option key={breed} value={breed}>{breed}</option>
));

const birdBreedOptions = Object.values(BirdBreed).map((breed) => (
  <option key={breed} value={breed}>{breed}</option>
));
const horseBreedOptions = Object.values(HorseBreed).map((breed) => (
  <option key={breed} value={breed}>{breed}</option>
));

const handleTypeUpdate = (event) => {
  setTypee(event.target.value)
  console.log(event.target.value)
}
const handleBreedUpdate = (event) => {
  setBreedd(event.target.value)
  console.log(event.target.value)
}
//http://localhost:3001/pets/changeTypeAndBreed/1?type=dog&breed=domestic
const handleTypeAndBreedChange = () => {
  _put(`http://localhost:3001/pets/changeTypeAndBreed/${id}?type=${typee}&breed=${breedd}`)
  window.location.reload()

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

useEffect(() => {
  const token = getToken("token");
  if (token) {
    const decodedToken = jwt(token);
    getPets();
    if (decodedToken) {
      setIsToken(decodedToken.id);
      setRole(getRole(decodedToken.id))
    } 
  } else{history('/accessdenied/accessdenied')}
}, []);

  // get product
  const singleProduct = pets.find((product) => product.id === parseInt(productId));

  // Check if singleProduct is defined before destructuring its properties
  const { id, name, description, age, state, petCategory, breed, userId, image: customImageName } = singleProduct || {};

  const handleNameChange = () => {
    _put(`http://localhost:3001/pets/changeName/${id}/${namee}`)
    window.location.reload()

  }

  const handleDescriptionChange = () => {
    _put(`http://localhost:3001/pets/changeDescription/${id}/${descriptionn}`)
    window.location.reload()

  }
  
  const setDogs = () => {
    //setAgee("");
    //setLocationn("");
    setBreedd();
    setTypee("dog");
    setShowCats(false);
    setShowDogs(true);
    setShowRabbits(false);
    setShowBirds(false);
    setShowHorses(false);
    setShowFish(false);
}
const setCats = () => {
    //setAgee("");
    //setLocationn("");
    setBreedd();
    setTypee("cat");
    setShowDogs(false);
    setShowCats(true);
    setShowRabbits(false);
    setShowBirds(false);
    setShowHorses(false);
    setShowFish(false);
}
const setRabbits = () => {
    //setAgee("");
    //setLocationn("");
    setBreedd();
    setTypee("rabbit")
    setShowDogs(false);
    setShowCats(false);
    setShowRabbits(true);
    setShowBirds(false);
    setShowHorses(false);
    setShowFish(false);
}
const setBirds = () => {
    //setAgee("");
    //setLocationn("");
    setBreedd();
    setTypee("bird");
    setShowDogs(false);
    setShowCats(false);
    setShowRabbits(false);
    setShowBirds(true);
    setShowHorses(false);
    setShowFish(false);
}
const setHorses = () => {
    //setAgee("");
    //setLocationn("");
    setBreedd();
    setTypee("horse");
    setShowDogs(false);
    setShowCats(false);
    setShowRabbits(false);
    setShowBirds(false);
    setShowHorses(true);
    setShowFish(false);
}
const setFish = () => {
    //setAgee("");
    //setLocationn("");
    setBreedd();
    setTypee("fish");
    setShowDogs(false);
    setShowCats(false);
    setShowRabbits(false);
    setShowBirds(false);
    setShowHorses(false);
    setShowFish(true);
}
const doType = (event) => {
  handleTypeUpdate(event);
  handlePetType(event);
}
const handleImageUpload = async (event) => {
  const file = event.target.files[0];
  // const fileURL = URL.createObjectURL(file)
  setImage(file);
};
const handleFirebase = () => {
  return new Promise(async (resolve, reject) => {
    if (!image) {
      reject(new Error('No image selected'));
      return;
    }

    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // progress
      },
      (error) => {
        // error function
        console.log(error);
        reject(error);
      },
      async () => {
        // complete function
        try {
          const url = await storage.ref('images').child(image.name).getDownloadURL();
          console.log("URL ->", url);
          setURL(url);
          console.log("URL set!");
          resolve(url);
        } catch (error) {
          console.log(error);
          reject(error);
        }
      }
    );
  });
};

const updateImage = async (id, image) => {
  try {
    const imgURL = await handleFirebase(image);
    console.log("Image URL", imgURL);
    await _put(`http://localhost:3001/pets/updateImage/${id}`, {
      image: imgURL
    });
    window.location.reload()

  } catch (e) {
    console.log(e);
  }
}
const deleteImage = async(id) => {
  try {
    await _put(`http://localhost:3001/pets/updateImage/${id}`, {
      image: null
    });
    window.location.reload()
  } catch (e) {
    console.log(e);
  }
}
  return (
    <main style={{backgroundColor: "rgb(237 234 217)"}}>
      <Navbar />
      <div className={styles.roww}>
      <div className="pg-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <h1 style={{textAlign:"center"}}>{name}</h1>
              {/* <p>{pathname}</p> */}
            </div>
            <div className="col-lg-5"></div>
          </div>
        </div>
      </div>
      <div className="container content">
        <div className="row">
          <div className="col-lg-5">
            <img src={customImageName || petImage} alt="" className={`img-fluid ${styles.imgFluid}`} />
          </div>
          <div className="col-lg-7">
            <h2 className="price">
              <strong>{breed} {petCategory} {age}</strong>
              {String(role) == "admin" ? <strong> / petId {id}, ownerId {userId}</strong>:null}
              
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
            &nbsp;
            <Link to="/yourpets/yourpets" className="btn btn-primary btn-sm">
              Your pets
            </Link>
          </div>
        </div>
      </div>
      </div>
      <div>


      


      <div className={styles.edit}>
      <h1 style={{marginTop: "60px"}}>Edit the details</h1>
      <div className={styles.formm}>
      <label>Name</label>
      <input value={namee} onChange={(event) => setNamee(event.target.value)}></input>
      <button onClick={handleNameChange}>Change name</button>

      <label>Description</label>
      <textarea value={descriptionn} onChange={(event) => setDescriptionn(event.target.value)}></textarea>
      <button onClick={handleDescriptionChange}>Change description</button>

      <label>Age
          <select value={agee} onChange={handleAgeUpdate}>
              <option></option>
                 {ageOptions}
              </select>
      </label>        
      <button onClick={handleAgeChange}>Change age</button>   
      <label>Location
          <select value={locationn} onChange={handleLocationUpdate}>
              <option></option>
                 {locationOptions}
              </select>
      </label>        
      <button onClick={handleLocationChange}>Change location</button> 

      <label>Type
          <select value={typee} onChange={doType}>
              <option></option>
                 {typeOptions}
              </select>
      </label>
      {showDogs ?
                    <>
                     <label >Breed
                    <select value={breedd} name="breed" onChange={handleBreedUpdate}>
                            <option></option>
                            {dogBreedOptions}
                        </select>
                    </label>
                    <button onClick={handleTypeAndBreedChange}>Update type and breed</button>

                    </>
                    : null
                    }
                    {showCats ?
                    <>
                    <label >Breed
                    <select value={breedd} name="breed" onChange={handleBreedUpdate}>
                            <option></option>
                            {catBreedOptions}
                        </select>
                    </label>
                    <button onClick={handleTypeAndBreedChange}>Update type and breed</button>


                    </>
                    : null
                    }
                    {showFish ?
                    <>
                    <label >Breed
                    <select value={breedd} name="breed" onChange={handleBreedUpdate}>
                            <option></option>
                            {fishBreedOptions}
                        </select>
                    </label>
                    <button onClick={handleTypeAndBreedChange}>Update type and breed</button>

                    </>
                    : null
                    }
                    
                    {showHorses ?
                    <>
                    <label>Breed
                    <select value={breedd} name="breed" onChange={handleBreedUpdate}>
                            <option></option>
                            {horseBreedOptions}
                        </select>
                    </label>
                    <button onClick={handleTypeAndBreedChange}>Update type and breed</button>

                    </>
                    : null
                    }

                    {showRabbits ?
                    <>
                    <label >Breed
                    <select value={breedd} name="breed" id="breed" onChange={handleBreedUpdate}>
                            <option></option>
                            {rabbitBreedOptions}
                        </select>
                    </label>
                    <button onClick={handleTypeAndBreedChange}>Update type and breed</button>
                    </>
                    : null
                    }

                    {showBirds ?
                    <>
                    <label >Breed
                    <select value={breedd} name="breed" id="breed" onChange={handleBreedUpdate}>
                            <option></option>
                            {birdBreedOptions}
                        </select>
                    </label>
                    <button onClick={handleTypeAndBreedChange}>Update type and breed</button>
                    </>
                    : null
                    }
                    
                    <input type="file" onChange={handleImageUpload} />
                    <button onClick={() => updateImage(id, image)}>Update image</button>
                    <button onClick={() => deleteImage(id)}>Delete image</button>
                   
          </div>
      </div>
      
      <Footer/>
      </div>
    </main>
  );
};

export default EditPet;
