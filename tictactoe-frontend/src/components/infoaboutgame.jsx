import React from 'react';

export const InfoAboutGame = ({turn}) => {
    return (
        <div className='aboutDiv'>
            <h2>
                {turn === "Yours" ? "Your Turn" : turn === "Opponents" ? "Opponents Turn" : ""}
            </h2>
        </div>
   )
}