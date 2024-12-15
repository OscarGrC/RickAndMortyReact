import React from 'react';
import './CardCharacter.css';

const CardCharacter = ({ image, name }) => {
    return (
        <div className="card">
            <img src={image} className="card__image" />
            <p className="card__name">{name}</p>
        </div>
    );
};

export default CardCharacter;
