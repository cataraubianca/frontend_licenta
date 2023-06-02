import React from "react";
import { Card, Button } from "react-bootstrap";

const ProductCard = props => {
  return (
    <>
      <Card style={{ width: "inherit", backgroundColor: "#caa0a8" }}>
        <Card.Img variant="top" src={props.imgSrc} />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <div className="product-actions">
            <Button style={{ backgroundColor: "#efefe0", color: "black", borderColor: "#efefe0"}}>See this pet</Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProductCard;
