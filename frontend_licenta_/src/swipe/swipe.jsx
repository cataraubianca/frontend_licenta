import React, { useState, useEffect } from "react";
import { _get } from "../utils/api";
import petImage from "../images/peticon.jpg";
import styles from "./swipe.module.css";
import Navbar from "../navbar/navbar";
import { useNavigate } from "react-router-dom";
import Confetti from "./confetti";
import Footer from "../footer/footer";
const Swipe = () => {
  const [pets, setPets] = useState([]);
  const [currentPetIndex, setCurrentPetIndex] = useState(0);
  const [isMatched, setIsMatched] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(true);
  const history = useNavigate();

  useEffect(() => {
    _get("http://localhost:3001/pets/random")
      .then((response) => {
        if (response) {
          setPets(response.data);
        } else {
          console.log("No pets found");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleNextPet = () => {
    setIsCardVisible(false); // Set the visibility of the card to false for the fade-out effect
    setTimeout(() => {
      setCurrentPetIndex((prevIndex) => prevIndex + 1);
      setIsMatched(false);
      setIsCardVisible(true); // Set the visibility of the card to true for the fade-in effect
    }, 500); // Delay the update of currentPetIndex and the visibility of the card for 500 milliseconds (adjust the duration as needed)
  };

  const handleMatch = () => {
    setIsMatched(true);
  };

  const currentPet = pets[currentPetIndex];

  const goToProfile = (id) => {
    window.location.replace(`http://localhost:3000/findapet/${id}`);
    setIsMatched(false);
  };

  return (
    <div style={{backgroundColor: "#e2c9ce"}}>
      <Navbar />
      <div style={{ backgroundColor: "#e2c9ce", marginTop:"30px",textAlign: "center", fontSize:"30px" }}>Swipe right if you are interested, or left in other case</div>

      <div className={styles.tinder}>
        <button
          className={styles.nextButton}
          onClick={handleNextPet}
          disabled={currentPetIndex === pets.length - 1}
        >
          
        </button>
        <div className={styles.cardContainer}>
          {currentPet && (
            <div
              className={`${styles.card} ${
                isCardVisible ? styles.visible : styles.hidden
              }`}
            >
              <img
                className={styles.petImage}
                src={currentPet.image || petImage}
                alt="Pet"
              />
              <div className={styles.petInfo}>
                <h3 className={styles.petName}>{currentPet.name}</h3>
                <h4 className={styles.petName}>
                  {currentPet.breed} {currentPet.petCategory}
                </h4>
                <p className={styles.petDescription}>{currentPet.description}</p>
                {isMatched && (
                  <button
                    className={styles.profileButton}
                    onClick={() => goToProfile(currentPet.id)}
                  >
                    See profile
                  </button>
                )}
                {isMatched && <Confetti />}
              </div>
            </div>
          )}
        </div>
        <button
          className={`${styles.matchButton} ${isMatched ? styles.matched : ""}`}
          onClick={handleMatch}
          disabled={!currentPet || isMatched}
        >
        </button>
      </div>
      <Footer style={{marginTop: "40px"}}/>
    </div>
  );
};

export default Swipe;
