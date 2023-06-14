import React, { useEffect, useState } from "react";
import Navbar from "../navbar/navbar";
import { _get, _post, _delete } from "../utils/api";
import styles from "./admin.module.css";
import Footer from "../footer/footer";
export const Admin = () => {
    const [data, setData] = useState()
    const [geocodex, setGeocodex] = useState()
    const [geocodey, setGeocodey] = useState()
    const [name, setName] = useState()
    const [link, setLink] = useState()
    const [userId, setUserId] = useState()
    const [petId, setPetId] = useState()
    const [shelterId, setShelterId] = useState()
    const handleGeocodex = (e) => {
        setGeocodex(e.target.value);
    }
    const handleGeocodey = (e) => {
        setGeocodey(e.target.value);
    }
    const handleName = (e) => {
        setName(e.target.value);
    }
    const handleLink = (e) => {
        setLink(e.target.value);
    }
    const handleUser = (e) => {
        setUserId(e.target.value);
    }
    const handlePet = (e) => {
        setPetId(e.target.value);
    }
    const handleShelter = (e) => {
        setShelterId(e.target.value);
    }

    const handleFormSubmit = async(e) => {
        e.preventDefault();

        _post("http://localhost:3001/shelters", {
            geocodex: geocodex,
            geocodey: geocodey,
            name: name,
            link: link,
        }).then((res) => {
            if(res){console.log(res)}
        })
    }
    const getShelters = () => {
        _get("http://localhost:3001/shelters").then((challenges) => {
            console.log(challenges.data);
            console.log("Lista")
        })
    }

    const handleDeleteUser = () => {
        _delete(`http://localhost:3001/users/${userId}`)

    }

    const handleDeleteShelter = () => {
        _delete(`http://localhost:3001/shelters/${shelterId}`)

    }
    const handleDeletePet = () => {
        _delete(`http://localhost:3001/pets/${petId}`)
    }
    useEffect(() => {
        getShelters();
        console.log("workeed")
    }, []);
    return(
    <div style={{backgroundColor:"#d8d5c4"}}>
    <Navbar/>
    
    <h1 style={{backgroundColor:"#d8d5c4"}}>Admin page</h1>
    <h2 style={{marginLeft:"580px", backgroundColor:"#d8d5c4"}}>Add a new shelter below</h2>
    <div className={styles.all}>
    <div className={styles.three}>
    <form className={styles.form} onSubmit={handleFormSubmit}>
        <label>Geocode value x</label>
        <input onChange={handleGeocodex} value={geocodex}/>
        <label>Geocode value y</label>
        <input onChange={handleGeocodey} value={geocodey}/>
        <label>Shelter name</label>
        <input onChange={handleName} value={name}/>
        <label>Link to shelter web page</label>
        <input onChange={handleLink} value={link}/>
        <button type="submit">Create</button>
    </form>
    </div>

    <div className={styles.two}>
    <form className={styles.form} onSubmit={handleDeleteUser}>
        <label>Delete user by id</label>
        <input type="number" onChange={handleUser} value={userId}/>
        <button type="submit">Delete</button>
    </form>

    <form className={styles.form} onSubmit={handleDeletePet}>
        <label>Delete pet by id</label>
        <input type="number" onChange={handlePet} value={petId}/>
        <button type="submit">Delete</button>
    </form>
    <form className={styles.form} onSubmit={handleDeleteShelter}>
        <label>Delete shelter by id</label>
        <input type="number" onChange={handleShelter} value={shelterId}/>
        <button type="submit">Delete</button>
    </form>
    </div>
    </div>
    <Footer/>
    </div>
    )
}