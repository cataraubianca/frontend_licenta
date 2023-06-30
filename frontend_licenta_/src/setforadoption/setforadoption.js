import React from "react";
import Navbar from "../navbar/navbar";
import styles from "./setforadoption.module.css"
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { States } from "./enum.ts";
import { petCategory } from "./enum.ts";
import { CatBreed } from "./enum.ts";
import { RabbitBreed } from "./enum.ts";
import { DogBreed } from "./enum.ts";
import { FishBreed } from "./enum.ts";
import { BirdBreed } from "./enum.ts";
import { HorseBreed } from "./enum.ts";
import { Age } from "./enum.ts";
import { _post, _get } from "../utils/api";
import { useNavigate } from "react-router-dom";
import jwt from "jwt-decode";
import { getToken } from "../utils/storage";
import { storage } from "../firebase";
import Footer from "../footer/footer";
import { useEffect } from "react";
import ModalLoginAdopt from "../ModalLoginAdopt/ModalLoginAdopt";
export const SetForAdoption = () => {
    const history = useNavigate()
    const stateOptions = Object.values(States).map((state) => (
        <option key={state} value={state}>{state}</option>
      ));
      
      const petCategoryOptions = Object.values(petCategory).map((category) => (
        <option key={category} value={category}>{category}</option>
      ));


    const [type, setType] = useState('cat');
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('domestic');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('Alabama');
    const [age, setAge] = useState('age'); //baby?
    const [image, setImage] = useState();
    const [filename, setFilename] = useState('');
    const [imageId, setImageId] = useState('');
    const [user, setUser] = useState(null);
    const [url, setURL] = useState();
    const [succesMessage, setSuccesMessage] = useState(false);
    const [failMessage, setFailMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    
const [warningMessage, setWarningMessage] = useState('');
    const handleAgeChange = (event) => {
        setAge(event.target.value);
        console.log(event.target.value)
      };
    const handleTypeChange = (event) => {
        setType(event.target.value);
        console.log(event.target.value)
      };
    const handleNameChange = (event) => {
        setName(event.target.value);
        console.log(event.target.value)
      };
    const handleBreedChange = (event) => {
        setBreed(event.target.value);
        console.log(event.target.value)
      };
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
        console.log(event.target.value)
      };
    const handleLocationChange = (event) => {
        setLocation(event.target.value);
        console.log(event.target.value)
      };
      const { register, handleSubmit, formState: { errors } } = useForm();
      const onSubmit = data => console.log(data);
      console.log(errors);
      

      useEffect(() => {
        const token = getToken("token");
        if (token) {
          const decodedToken = jwt(token);
          if (decodedToken) {
            setUser(decodedToken.id);
          } 
        }else {setModalOpen(true)}
      }, []);
     
const handleImageUpload = async (event) => {
  const file = event.target.files[0];
  // const fileURL = URL.createObjectURL(file)
  setImage(file);
};

const handleFirebase = () => {
  return new Promise((resolve, reject) => {
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
const validateForm = () => {
  if (!name || !description || !image) {
    setWarningMessage('Please fill in all mandatory fields.');
    return false;
  }
  return true;
};

const handleFormSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  try {
    const imgURL = await handleFirebase();
    console.log("Image URL", imgURL);
    await _post("http://localhost:3001/pets", {
      name: name,
      description: description,
      age: age,
      state: location,
      petCategory: type,
      breed: breed,
      userId: user,
      image: imgURL
    });
    setSuccessMessage('Added pet successfully!');
    window.location.reload()
  } catch (e) {
    console.log(e);
    setFailMessage('Failed to add pet. Please try again.');

  }
};
      
      
    return (
        <div className={styles.allall}>
          {modalOpen && <div><ModalLoginAdopt setOpenModal={setModalOpen} /></div>}

        <Navbar/>
        
        <div className={styles.all}>
        <div className={styles.titles}>
        <div className={styles.title1}>Time to find your pet a new home?</div>
        <div className={styles.title2}>We got you!</div>
        <div className={styles.title3}>Fill out the form below and let's get started</div>
        {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
{failMessage && <div style={{ color: 'red' }}>{failMessage}</div>}

        </div>
        <form className={styles.formm} onSubmit={handleFormSubmit}>
          <div className={styles.content}>
            <div>Pet name</div>
            <input value={name} onChange={ handleNameChange} type="text"  />
            <div>What type of animal it is?</div>
            <select value={type} onChange={handleTypeChange}>
                {petCategoryOptions}
            </select>
            {
                type == 'dog' && (
                    <>
                    <div>What dog breed it is?</div>
                    <select value={breed} onChange={handleBreedChange}>
                        {Object.values(DogBreed).map((breed) => (
                        <option key={breed} value={breed}>
                            {breed}
                        </option>
                        ))}
                    </select>
                    </>
                )
            }
            {
                type == 'cat' && (
                    <>
                    <div>What cat breed it is?</div>
                    <select value={breed} onChange={handleBreedChange}>
                        {Object.values(CatBreed).map((breed) => (
                        <option key={breed} value={breed}>
                            {breed}
                        </option>
                        ))}
                    </select>
                    </>
                )
            }
            {
                type == 'rabbit' && (
                    <>
                    <div>What rabbit breed it is?</div>
                    <select value={breed} onChange={handleBreedChange}>
                        {Object.values(RabbitBreed).map((breed) => (
                        <option key={breed} value={breed}>
                            {breed}
                        </option>
                        ))}
                    </select>
                    </>
                )
            }
            {
                type == 'fish' && (
                    <>
                    <div>What fish breed it is?</div>
                    <select value={breed} onChange={handleBreedChange}>
                        {Object.values(FishBreed).map((breed) => (
                        <option key={breed} value={breed}>
                            {breed}
                        </option>
                        ))}
                    </select>
                    </>
                )
            }
            {
                type == 'bird' && (
                    <>
                    <div>What bird breed it is?</div>
                    <select value={breed} onChange={handleBreedChange}>
                        {Object.values(BirdBreed).map((breed) => (
                        <option key={breed} value={breed}>
                            {breed}
                        </option>
                        ))}
                    </select>
                    </>
                )
            }
            {
                type == 'horse' && (
                    <>
                    <div>What horse breed it is?</div>
                    <select value={breed} onChange={handleBreedChange}>
                        {Object.values(HorseBreed).map((breed) => (
                        <option key={breed} value={breed}>
                            {breed}
                        </option>
                        ))}
                    </select>
                    </>
                )
            }
            <div>Choose age</div>
            <select value={age} onChange={handleAgeChange}>
            {Object.values(Age).map((age) => (
                        <option key={age} value={age}>
                            {age}
                        </option>
                        ))}
            </select>
            <div>Enter your pets description</div>
            <textarea value={description} onChange={handleDescriptionChange} type="text"   maxlength="349"/>
            <div>Adoption Location</div>
            <select value={location} onChange={handleLocationChange}>
                {stateOptions}
            </select>
            <div>Add image</div>
            <input type="file" onChange={handleImageUpload} />
           

            <div>Ready to set your pet for adoption?</div>
            {succesMessage ? <div style={{color: "green"}}>Added pet successfully!</div>: null}
            <button type="submit" onClick={() => handleFormSubmit}>Yes!{" "}</button>{" "}
            {warningMessage && <div style={{ color: 'orange' }}>{warningMessage}</div>}
            {user==null? (<div style={{color:"red"}}> You need to log in first</div>):null}
            </div>
            
        </form>
        
        </div>
        

        <Footer/>
        </div>
    )
}