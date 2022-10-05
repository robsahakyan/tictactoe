import React from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const SignInPart = ({setForSignIn, socket, setCells, setUsers}) => {

    const submitHandler = (e) => {
        e.preventDefault();
        setForSignIn(true);
        socket.emit('sign_in', e.target[0].value)
    }

    return (
        <div className='d-flex flex-column align-items-center'>
            <Form style={{ width: '20rem', paddingTop: '2rem'}}  onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label>Create nickname for game</Form.Label>
                <Form.Control type='text' required/>
            </Form.Group>
            <Button type='submit' style={{marginTop: '2rem'}}>Send</Button>
            </Form>
        </div>
    )
}