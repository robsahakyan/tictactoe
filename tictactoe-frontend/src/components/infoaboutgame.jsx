import React from 'react';

export const InfoAboutGame = ({turn, result}) => {
    return (
        <div className='aboutDiv'>
            {!result ? 
             <h2>
                {turn === "Yours" ? "Your Turn" : turn === "Opponents" ? "Opponents Turn" : ""}
            </h2> :
            <h2>
                {result}
            </h2>
            }
        </div>
   )
}