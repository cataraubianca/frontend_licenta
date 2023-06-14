import React from "react";
import styles from "./petCard.module.css";
import petImage from '../images/peticon.jpg'

const PetCard = ({ pet }) => {
  return (
    <div className={styles.card}>
      <img src={pet.image || petImage} alt={pet.name} className={styles.image} />
      <h3 className={styles.name}>{pet.name}</h3>
      <h4>{pet.breed} {pet.petCategory}</h4>
      <p className={styles.description}>{pet.description}</p>
    </div>
  );
};

export default PetCard;
