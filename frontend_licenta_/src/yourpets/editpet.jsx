import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import Navbar from '../navbar/navbar.js';
import { useState, useEffect } from 'react';
import { _get, _put } from '../utils/api.js';
import petImage from '../images/peticon.jpg';
import { States } from "./enum.ts";
import { petCategory } from "./enum.ts";
import { CatBreed } from "./enum.ts";
import { RabbitBreed } from "./enum.ts";
import { DogBreed } from "./enum.ts";
import { FishBreed } from "./enum.ts";
import { BirdBreed } from "./enum.ts";
import { HorseBreed } from "./enum.ts";
import { Age } from "./enum.ts";
import { storage } from "../firebase";

const EditPet = () => {
  const navigate = useNavigate();
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
}




const typeOptions = Object.values(petCategory).map((type) => (
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
}





  useEffect(() => {
    getPets();
  }, []);

  // get product
  const singleProduct = pets.find((product) => product.id === parseInt(productId));

  // Check if singleProduct is defined before destructuring its properties
  const { id, name, description, age, state, petCategory1, breed } = singleProduct || {};

  const handleNameChange = () => {
    _put(`http://localhost:3001/pets/changeName/${id}/${namee}`)
  }

  const handleDescriptionChange = () => {
    _put(`http://localhost:3001/pets/changeDescription/${id}/${descriptionn}`)
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
  } catch (e) {
    console.log(e);
  }
}
const deleteImage = async(id) => {
  try {
    await _put(`http://localhost:3001/pets/updateImage/${id}`, {
      image: null
    });
  } catch (e) {
    console.log(e);
  }
}
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
              <strong>{breed} {petCategory1} {age}</strong>
              
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


      <div>edit</div>


      <>
      <input value={namee} onChange={(event) => setNamee(event.target.value)}></input>
      <button onClick={handleNameChange}>Change name</button>

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
                    <button onClick={() => deleteImage(id)}>Delete image</button>
                    <input type="file" onChange={handleImageUpload} />
                    <button onClick={() => updateImage(id, image)}>Update image</button>
      </>
    </main>
  );
};

export default EditPet;
