import React from 'react';

export const SignInPart = ({setForSignIn, socket}) => {
    const submitHandler = (e) => {
        e.preventDefault();
        setForSignIn(true);
        socket.emit('sign_in', e.target[0].value)
    }

    return (
        <form onSubmit={submitHandler}>
            <label htmlFor='nickname'>Create nickname for game</label>
            <br/>
            <input type='text' id='nickname'></input>
            <button type='submit'>SEND</button>
        </form>
    )
}