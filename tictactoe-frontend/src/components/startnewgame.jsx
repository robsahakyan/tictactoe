import React from 'react';

export const StartNewGame = () => {
    const clickHandler = () => {
        window.location.reload()
    }
    return (
        <div className='startNewDiv'>
            <button onClick={clickHandler}>START NEW GAME</button>
        </div>
    )
}