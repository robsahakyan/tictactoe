import React from 'react';
import { useEffect } from 'react';
import { toFilterBoardArray } from '../utils';

export const SignInPart = ({setForSignIn, socket, setCells, setUsers}) => {

    const submitHandler = (e) => {
        if (!e.target[0].value) {
            return;
        }
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