
import React from "react";

const Square = ({ square, value, onClick }) => {
    const style = value ? `circle ${value}` : `circle`;

    return (
        <div className="sub-board" onClick={onClick}>
            {square.map((square, i) => (
                <button role="button" key={i} className={'circle '+ square}>
                </button>))}
        </div>


    );
};

export default Square;