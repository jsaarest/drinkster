import React, { ReactElement, useState } from 'react';
import { Cocktail } from '../types';
import IngredientsList from './IngredientsList';
import FullDataCard from './FullDataCard';
import { getIcon } from '../assets/icons/icons';

interface ModalProps {
  onClose: () => void;
  drink: Cocktail;
  className: string;
}

const FullDataModal: React.FC<ModalProps> = ({ onClose, drink, className }) => {
  const closeModal = () => {
    onClose();
  };

  return (
    <div className={`${className}`} onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={closeModal}>{getIcon("arrow-left")}</span>
        <div className="card card-plain" key={drink.idDrink}>
          <img
            src={drink.strDrinkThumb}
            className='card-image'
            draggable={false}
          />
          <div className="text-area">
            <div className="tag-line">
              <IngredientsList ingredients={[drink.strIngredient1, drink.strIngredient2, drink.strIngredient3, drink.strIngredient4]} />
            </div>

            <h2>{drink.strDrink}</h2>
            <div className="scrollable-text">
              <p>
                {drink.strInstructions}
              </p>
              <div className="scrollable-text-shadow" />
            </div>
            <FullDataCard {...drink} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullDataModal;
