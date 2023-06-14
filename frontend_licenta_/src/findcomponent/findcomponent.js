import React from "react";
import styles from "./findcomponent.module.css"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { States } from "../setforadoption/enum.ts";
import { petCategory } from "../setforadoption/enum.ts";
import { CatBreed } from "../setforadoption/enum.ts";
import { RabbitBreed } from "../setforadoption/enum.ts";
import { DogBreed } from "../setforadoption/enum.ts";
import { FishBreed } from "../setforadoption/enum.ts";
import { BirdBreed } from "../setforadoption/enum.ts";
import { HorseBreed } from "../setforadoption/enum.ts";
import { Age } from "../setforadoption/enum.ts";
import { Link } from "react-router-dom";
export default function FindPetComponent() {
    const history = useNavigate();
    
    const [ showDogs, setShowDogs ] = useState(true);
    const [ showCats, setShowCats ] = useState(false);
    const [ showRabbits, setShowRabbits ] = useState(false);
    const [ showHorses, setShowHorses ] = useState(false);
    const [ showBirds, setShowBirds ] = useState(false);
    const [ showFish, setShowFish ] = useState(false);
    const [ type, setType ] = useState();
    const [ name, setName ] = useState();
    const [breed, setBreed] = useState('');
    const [location, setLocation] = useState('');
    const [age, setAge] = useState('');
    
    const handleClick = () => {
        localStorage.setItem('age',age)
        localStorage.setItem('location', location)
        localStorage.setItem('type', type)
        localStorage.setItem('breed',breed)
        const propsToSend = {
          age: age,
          location: location,
          petCategory: type,
          breed: breed
        };
        console.log("prpr",propsToSend)
        history({
          pathname: "/advancedSearch/advancedSearch",
          state: propsToSend
        });
      };
    
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
    const handleLocationChange = (event) => {
        setLocation(event.target.value);
        console.log(event.target.value)
      };
    const stateOptions = Object.values(States).map((state) => (
        <option key={state} value={state}>{state}</option>
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

    const ageOptions = Object.values(Age).map((age) => (
        <option key={age} value={age}>{age}</option>
    ));

    useEffect(() => {
        setDogs();
    }, []);
    const setDogs = () => {
        setAge("");
        setLocation("");
        setBreed("");
        setType("dog");
        setShowCats(false);
        setShowDogs(true);
        setShowRabbits(false);
        setShowBirds(false);
        setShowHorses(false);
        setShowFish(false);
    }
    const setCats = () => {
        setAge("");
        setLocation("");
        setBreed("");
        setType("cat");
        setShowDogs(false);
        setShowCats(true);
        setShowRabbits(false);
        setShowBirds(false);
        setShowHorses(false);
        setShowFish(false);
    }
    const setRabbits = () => {
        setAge("");
        setLocation("");
        setBreed("");
        setType("rabbit")
        setShowDogs(false);
        setShowCats(false);
        setShowRabbits(true);
        setShowBirds(false);
        setShowHorses(false);
        setShowFish(false);
    }
    const setBirds = () => {
        setAge("");
        setLocation("");
        setBreed("");
        setType("bird");
        setShowDogs(false);
        setShowCats(false);
        setShowRabbits(false);
        setShowBirds(true);
        setShowHorses(false);
        setShowFish(false);
    }
    const setHorses = () => {
        setAge("");
        setLocation("");
        setBreed("");
        setType("horse");
        setShowDogs(false);
        setShowCats(false);
        setShowRabbits(false);
        setShowBirds(false);
        setShowHorses(true);
        setShowFish(false);
    }
    const setFish = () => {
        setAge("");
        setLocation("");
        setBreed("");
        setType("fish");
        setShowDogs(false);
        setShowCats(false);
        setShowRabbits(false);
        setShowBirds(false);
        setShowHorses(false);
        setShowFish(true);
    }

    return(
        <div className={styles.findcomponent}>
        <form className={styles.formbox}>

                    <button type="button" className={styles.searchbttn} onClick={()=>setDogs()}>Dogs</button>
                    <button type="button" className={styles.searchbttn} onClick={()=>setCats()}>Cats</button>
                    <button type="button" className={styles.searchbttn} onClick={()=>setFish()}>Fish</button>
                    <button type="button" className={styles.searchbttn} onClick={()=>setHorses()}>Horses</button>
                    <button type="button" className={styles.searchbttn} onClick={()=>setRabbits()}>Rabbits</button>
                    <button type="button" className={styles.searchbttn} onClick={()=>setBirds()}>Birds</button>
                    <div className={styles.forminput}>
                    <div className={styles.fields}>
                    {showDogs ?
                    <>
                    <h2 className={styles.searchtitlee}> Find dogs by:</h2>
                    
                    <label className={styles.formlabel}>Location
                    <select value={location} onChange={handleLocationChange}>
                        <option></option>
                        {stateOptions}
                    </select>
                    </label>

                    <label className={styles.formlabel}>Age
                       <select value={age} onChange={handleAgeChange}>
                       <option></option>
                        {ageOptions}
                       </select>
                    </label>
                    <label className={styles.formlabel}>Breed
                    <select value={breed} name="breed" id="breed" onChange={handleBreedChange}>
                            <option></option>
                            {dogBreedOptions}
                        </select>
                    </label>

                    
                    </>
                    : null
                    }
                    {showCats ?
                    <>
                    <h2 className={styles.searchtitlee}> Find cats by:</h2>
                    <label className={styles.formlabel}>Location
                    <select  value={location} onChange={handleLocationChange}>
                        <option></option>
                        {stateOptions}
                    </select>
                    </label>

                    <label className={styles.formlabel}>Age
                       <select value={age} onChange={handleAgeChange}>
                        <option></option>
                        {ageOptions}
                       </select>
                    </label>
                    <label className={styles.formlabel}>Breed
                    <select value={breed} name="breed" id="breed" onChange={handleBreedChange}>
                            <option></option>
                            {catBreedOptions}
                        </select>
                    </label>

                    </>
                    : null
                    }
                    {showFish ?
                    <>
                    <h2 className={styles.searchtitlee}> Find fish by:</h2>
                    <label className={styles.formlabel}>Location
                    <select value={location} onChange={handleLocationChange}>
                        <option></option>
                        {stateOptions}
                    </select>
                    </label>

                    <label className={styles.formlabel}>Age
                       <select value={age} onChange={handleAgeChange}>
                       <option></option>
                        {ageOptions}
                       </select>
                    </label>
                    <label className={styles.formlabel}>Breed
                    <select value={breed} name="breed" id="breed" onChange={handleBreedChange}>
                            <option></option>
                            {fishBreedOptions}
                        </select>
                    </label>

                    </>
                    : null
                    }
                    
                    {showHorses ?
                    <>
                    <h2 className={styles.searchtitlee}> Find horse by:</h2>
                    <label className={styles.formlabel}>Location
                    <select value={location} onChange={handleLocationChange}>
                        <option></option>
                        {stateOptions}
                    </select>
                    </label>

                    <label className={styles.formlabel}>Age
                       <select value={age} onChange={handleAgeChange}>
                       <option></option>
                        {ageOptions}
                       </select>
                    </label>
                    <label className={styles.formlabel}>Breed
                    <select value={breed} name="breed" id="breed" onChange={handleBreedChange}>
                            <option></option>
                            {horseBreedOptions}
                        </select>
                    </label>

                    </>
                    : null
                    }

                    {showRabbits ?
                    <>
                    <h2 className={styles.searchtitlee}> Find rabbits by:</h2>
                    <label className={styles.formlabel}>Location
                    <select  value={location} onChange={handleLocationChange}>
                        <option></option>
                        {stateOptions}
                    </select>
                    </label>

                    <label className={styles.formlabel}>Age
                       <select value={age} onChange={handleAgeChange}>
                        <option></option>
                        {ageOptions}
                       </select>
                    </label>
                    <label className={styles.formlabel}>Breed
                    <select value={breed} name="breed" id="breed" onChange={handleBreedChange}>
                            <option></option>
                            {rabbitBreedOptions}
                        </select>
                    </label>

                    </>
                    : null
                    }

                    {showBirds ?
                    <>
                    <h2 className={styles.searchtitlee}> Find birds by:</h2>
                    <label className={styles.formlabel}>Location
                    <select value={location} onChange={handleLocationChange}>
                        <option></option>
                        {stateOptions}
                    </select>
                    </label>

                    <label className={styles.formlabel}>Age
                       <select value={age} onChange={handleAgeChange}>
                        <option></option>
                        {ageOptions}
                       </select>
                    </label>
                    <label className={styles.formlabel}>Breed
                    <select value={breed} name="breed" id="breed" onChange={handleBreedChange}>
                            <option></option>
                            {birdBreedOptions}
                        </select>
                    </label>

                    </> 
                    : null
                    }
                    </div>
                    <button className={styles.search} onClick={handleClick}>Search</button>
                    </div>
                </form>
        </div>
    )
}