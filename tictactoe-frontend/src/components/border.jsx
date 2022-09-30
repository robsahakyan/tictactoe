import React from 'react';
import { useEffect } from 'react';
import { toFilterBoardArray } from '../utils';

export const BorderPart = ({cellsArray, socket, setCells, setTurn, turn }) => {
    useEffect(() => {
        socket.on("update_board_table", (data) => {
            console.log(data)
            setCells(toFilterBoardArray(data.boardArray));
        })
        socket.on('turn_changed', () => {
            setTurn("Yours")
        })
    },[socket])

    const clickHandler = (e) => {
        socket.emit("sendToMove", {userId: socket.id, id: e.target.id})
        setTurn("Opponents")
      }

    return (
        <table>
            <tbody>
            {cellsArray.map((row,i) => {
                return (<tr className="rowDiv" key={`x: ${i}`}>
                {row.map((field, j) => {
                    return (
                    <td className="spanBox" key={cellsArray.length * i + j} >
                        <button 
                            id={cellsArray.length * i + j}
                            className='tdButton'
                            onClick={clickHandler} disabled={turn === "Opponents" || field.state}
                            >{field.state}
                        </button>
                    </td>)
                    })}
                </tr>)
            })}
            </tbody>
        </table>
    )
}