import React, { useEffect } from 'react';
import { toFilterBoardArray } from '../utils';

export const FormPart = ({setCells, socket, setUsers }) => {
  useEffect(() => {
    socket.on('get_initial_data', (data) => {
        console.log(data)
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

    return (
        <form  onSubmit={submitHandler}>
            <label htmlFor='inputText'>Enter count of cells:</label>
            <br />
            <input type='number' id='inputText'></input>
            <button type='submit'>SEND</button>
        </form>
    )
}