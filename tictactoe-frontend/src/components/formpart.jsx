import React, { useEffect } from 'react';
import { toFilterBoardArray } from '../utils';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const FormPart = ({setCells, socket, setUsers }) => {
  useEffect(() => {
    socket.on('get_initial_data', (data) => {
        if (data.board.boardArray) {
            setCells(toFilterBoardArray(data.board.boardArray))
        }
        if (data.users) {
            setUsers(data.users)
        }
    })
  }, [socket])

    const submitHandler = (e) => {
        e.preventDefault();
        if(e.target[0].value < 3) {
          return;
        }
        let cellsCount = e.target[0].value;
        let board = [];
        for (let i = 0; i < cellsCount; ++i) {
          board[i] = [];
          for (let j = 0; j < cellsCount; ++j) {
            board[i].push({
              id: cellsCount * i + j,
              x: i,
              y: j, 
              state: ""
            })
          }
        }
        setCells(board);

        socket.emit("send_initial_state", board);
    }

    const validation = (e) => {
      if (e.current.value > 2) {
        return true
      } 
      return false
    }

    return (
      <div className='d-flex flex-column align-items-center'>
        <Form style={{ width: '20rem', paddingTop: '2rem'}}  onSubmit={submitHandler}>
        <Form.Group>
            <Form.Label>Enter count of cells</Form.Label>
            <Form.Control type='number' />
        </Form.Group>
        <Button type='submit' style={{marginTop: '2rem'}}>Send</Button>
        </Form>
      </div>
    )
}