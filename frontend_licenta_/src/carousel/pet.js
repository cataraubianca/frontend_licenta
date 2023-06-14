import React from "react";
import { Card, Button } from "react-bootstrap";
import petImage from '../images/peticon.jpg'

const ProductCard = ({pet}) => {
  return (
    <>
      <Card onClick={() => { window.location.href = `/findapet/${pet.id}`; }} style={{ height:"80vh",width: "inherit", backgroundColor: "#caa0a8" , borderRadius:"20px"}}>
        <Card.Img style={{height:"50vh",borderTopLeftRadius: "20px", borderTopRightRadius:"20px"}} variant="top" src={pet.image || petImage} />
        <Card.Body>
          <Card.Title>{pet.name}</Card.Title>
          <h4>{pet.breed} {pet.petCategory}</h4>
          <Card.Text>
            {pet.description}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProductCard;
