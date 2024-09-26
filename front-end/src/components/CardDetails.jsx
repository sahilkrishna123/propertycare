import React from "react";

const CardDetails = ({ title, description, price, image, onBackClick }) => {
  return (
    <div className="card">
      <img src={image} width="50px" alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text">${price}</p>
        <button className="btn btn-primary" onClick={onBackClick}>
          Back
        </button>
      </div>
    </div>
  );
};

export default CardDetails;
