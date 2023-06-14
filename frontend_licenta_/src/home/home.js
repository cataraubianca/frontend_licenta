import React, { useEffect, useState } from "react";
import Navbar from "../navbar/navbar";
import styles from "./home.module.css"
import ProductSlider from "../carousel/carousel";
import {ReactComponent as Logo} from '../logo.svg';
import dog from '../images/animated_dog(1).png'
import cat from '../images/animated_cat(1).png'
import lady_with_dogs from '../images/lady_with_dogs.png'
import { useNavigate } from "react-router-dom";
import FindPetComponent from "../findcomponent/findcomponent";
import Footer from "../footer/footer";
export const Home = () => {
    const history = useNavigate();
    const [ showDogs, setShowDogs ] = useState(true);
    const [ showCats, setShowCats ] = useState(false);
    const [ showOthers, setShowOthers ] = useState(false);
    const [ showShelters, setShowShelters ] = useState(false);
    useEffect(() => {
        setDogs();
    }, []);
    const setDogs = () => {
        setShowCats(false);
        setShowOthers(false);
        setShowShelters(false);
        setShowDogs(true);
    }
    const setCats = () => {
        setShowDogs(false);
        setShowOthers(false);
        setShowShelters(false);
        setShowCats(true);
    }
    const setOthers = () => {
        setShowDogs(false);
        setShowShelters(false);
        setShowCats(false);
        setShowOthers(true);
    }
    const setShelters = () => {
        setShowDogs(false);
        setShowCats(false);
        setShowOthers(false);
        setShowShelters(true);
    }
    return (
        <>
        <Navbar/>
        <div className={styles.container}>
            <div className={styles.search}>
            <h1 className={styles.searchtitle}>Ready to</h1>
            <h1 className={styles.searchtitle}> adopt a pet?</h1>
            <h3 className={styles.searchsecondtitle}>Let's get started. Search adoptable pets from shelters, rescues & individuals.</h3>
                <FindPetComponent />
            </div>
            <div className={styles.featured}>
                <div className={styles.featuredContent}>
                <ProductSlider />
                </div>
                </div>
            <div className={styles.tools}>
                <h1 className={styles.check}>Check out adoption advice</h1>
                <div className={styles.dogandcat}>
                    <div className={styles.dog}>
                        <img className={styles.dogimage} src={dog}></img>
                        <h3 className={styles.titledogandcat}>Why we recommend adopting</h3>
                        <p className={styles.pdogandcat}>There are so many reasons to adopt: meeting a unique pet, spending less, doing a good deed—but let's talk facts. Millions of pets enter shelters every year. And hundreds of thousands are euthanized each year. We don't tell you that to guilt you or be a downer, but that's why adoption really matters to us. So we would love it if you considered adopting. And, since you're here, we're guessing you are. Seriously, no judgment if you find a pet another way (every pet parent journey is different!). But we're here to help make adoption easier, however we can.</p>
                    </div>
                    <div className={styles.cat}>
                        <img  className={styles.catimage} src={cat}></img>
                        <h3 className={styles.titledogandcat}>How to find the right pet</h3>
                        <p  className={styles.pdogandcat}>Let's bust a myth. The perfect pet? Doesn't exist. Because there are so many pets that can be the right fit for you. It's just about knowing what you're looking for. So start by thinking about your criteria based on your lifestyle, breed preferences, living situation, (fur and human) family, etc. From there, our team can help match you with the right pet. Check out our Premium New Pet Alerts too. With Alerts, we'll email you newly added adoptable pets that fit your search—so you can check out matches and meet your next best friend faster.</p>
                    </div>
                </div>
            </div>




            <div className={styles.advice}>
                <div>
                    <img className={styles.ladywithdogs} src={lady_with_dogs}></img>
                </div>
                <div>
                    <h3 className={styles.bla}><b>Get to know us</b></h3>
                    <div className={styles.textladywithdogs}>We know pet adoption, because we're adopters too. We think it's just about the best thing you can do. But we'll be real: it can be a lengthy (paperwork-filled) process.</div>
                    <div className={styles.textladywithdogs}>So we're making it easier, with the tools, advice, and transparency you need—from the first search through to daily life as a pet parent.</div>
                    <div className={styles.textladywithdogs}>Because we'll do whatever it takes to help millions of people and pets find each other.</div>
                    <div className={styles.textladywithdogs}>Ready to find your pet?<b> <i> Let's do it. </i> </b></div>
                </div>
            </div>
        </div>
        <button
        onClick={() => history('/bot/bot')}
        style={{
          position: 'fixed',
          padding: '1rem 2rem',
          fontSize: '13px',
          bottom: '20px',
          right: '10px',
          backgroundColor: '#21474b',
          color: '#fff',
          textAlign: 'center',

          
        }}
      >
        Need more info about a breed? Ask our AI virtual assistant!
      </button>
      <Footer/>
        </>
    )
}