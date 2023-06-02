import React, { useEffect, useState } from "react";
import Navbar from "../navbar/navbar";
import { _get, _post } from "../utils/api";
import styles from "./admin.module.css";
export const Admin = () => {
    const [data, setData] = useState()
    const [geocodex, setGeocodex] = useState()
    const [geocodey, setGeocodey] = useState()
    const [name, setName] = useState()
    const [link, setLink] = useState()

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
            //nu se salveaza raspunsul
            console.log(challenges.data);
            console.log("Lista")
        })
    }
    useEffect(() => {
        getShelters();
        console.log("workeed")
    }, []);
    return(
    <>
    <Navbar/>
    <div className={styles.all}>
    <div>Admin page</div>
    <div>Add a new shelter below, or delete an existing one by name</div>
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
    </>
    )
}