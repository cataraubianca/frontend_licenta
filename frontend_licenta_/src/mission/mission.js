import React from "react";
import Navbar from "../navbar/navbar";
import styles from './mission.module.css';
import pngFooter from '../images/pngfooter.png'
import pngTop from '../images/pngtop.jpg'
import Footer from "../footer/footer";
export const Mission = () => {
    return(
        <div className={styles.allall}>
        <Navbar/>
        <div className={styles.all}>
            
            <h2 className={styles.description}>Our big-picture hope is for every pet in The United States to be safe, respected and loved - whether the pet is owned, surrendered to a shelter, unclaimed at the pound, seized by authorities, or trapped by rangers.</h2>
            <h1 className={styles.bigTitle}>Our mission is to...</h1>
            <div className={styles.smallTitle}>Disrupt the status quo.</div>
            <div className={styles.content}>We look at the big picture and create radical change that improves outcomes for rescue pets in The United States.</div>

            <div className={styles.smallTitle}>Use technology to drive social change.</div>
            <div className={styles.content}>We are digital innovators, always looking for ways we can leverage the latest advances in the tech world to solve the big issues and challenges that rescue pets face in The United States.</div>

            <div className={styles.smallTitle}>Create a positive and progressive culture for rescue.</div>
            <div className={styles.content}>We want to improve the rescue and adoption experience for everyone and believe that the best way to achieve this is by creating and nurturing a positive and progressive culture for rescue.</div>

            <div className={styles.smallTitle}>Drive advocacy through action.</div>
            <div className={styles.content}>Through all the innovative campaigns, programs and services we create and deliver, we actively advocate for rescue pets.</div>

            <div className={styles.smallTitle}>Unite to save lives.</div>
            <div className={styles.content}>We unite pets with new families, rescue groups with adopters and foster carers, corporate partners with a national rescue community, and we unite all passionate advocates for rescue pets to drive positive change.</div>
        </div>
        <img src={pngFooter} style={{ width: '210vh', height: '110vh' }} ></img>
        <Footer/>
        </div>

    )
}