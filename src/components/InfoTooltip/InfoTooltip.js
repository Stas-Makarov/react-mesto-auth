import React from 'react';
import { useEffect } from 'react';

function InfoTooltip(props) {
  
  return (
    <div className={`popup popup_type_log-confirm ${props.isOpen && 'popup_opened'}`} onClick={props.onClose}>
        <div className="popup__container-confirm">
            <button className="popup__close" type="button" onClick={props.onClose}></button>  
            <img 
                className="popup__confirm-image"
                src={props.imgPath}
                alt={props.title}
            />
            <h3 className="popup__item-caption">{props.title}</h3>
        </div>
    </div>
  );
}

export default InfoTooltip;