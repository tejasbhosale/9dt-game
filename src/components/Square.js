
import React from "react";

const Square = ({ square, value, onClick }) => {

    return (
        <div className="sub-board" onClick={onClick}>
            {square.map((square, i) => (
                <button key={i} className={'circle '+ square}>
                </button>))}
        </div>


    );
};

export default Square;