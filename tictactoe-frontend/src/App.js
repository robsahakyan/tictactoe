import React, { useEffect, useState } from 'react';
import './App.css';
import { BorderPart } from './components/border';
import { FormPart } from './components/formpart';
import { connect } from 'react-redux'
import { setCellsAC, setTurnAC, setForSignInAC, setUsersAC, setResultAC } from './redux/main-reducer';
import { InfoAboutGame } from './components/infoaboutgame';
import { SignInPart } from './components/signinpart';
import { Disconnect } from './components/disconnect';
import { StartNewGame } from './components/startnewgame';


function App({cellsArray, setCells, socket, setTurn, turn , isAuth, result, setForSignIn, setUsers, setResult}) {
  const [isDisconnected, setToDisconnect] = useState(false);
  useEffect(() => {
    socket.on('connect', () => {
      console.log("user connected")
      console.log(socket);
    });
   socket.on('disconnect_excessive', () => {
     setToDisconnect(true);
    socket.close()
   })
    socket.on('the_last_emit', (data) => {
      if (data.user) {
        setResult(`user ${data.user.nickname} wins`)
      } else {
        setResult('draw')
      }
    })
    socket.on('opponent_disconnected', () => {
      setResult("your opponent has left the match")
    })
    socket.on('disconnect', () => {
      console.log("user disconnected")
    });

    return () => {
      socket.off('connect');
    };
  }, []);
  return (
    <div className="App">
      {isDisconnected ? 
        <Disconnect /> 
        :
        !isAuth ?
        <SignInPart setForSignIn={setForSignIn} socket={socket} setCells={setCells} />
        :
        !cellsArray ? 
        <FormPart setCells={setCells} socket={socket} setUsers={setUsers} />
        :
        <>
          <InfoAboutGame turn={turn} result={result} />
          <BorderPart 
              cellsArray={cellsArray} 
              setCells={setCells} 
              socket={socket} 
              turn={turn}
              setTurn={setTurn}
              />
          {result && <StartNewGame/>}              
        </>
      }  
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cellsArray: state.main.cellsArray,
    turn: state.main.turn,
    isAuth: state.main.isAuth,
    result: state.main.result
  }
}

export default connect(
  mapStateToProps,
  {
    setCells: setCellsAC,
    setTurn: setTurnAC,
    setForSignIn: setForSignInAC,
    setUsers: setUsersAC,
    setResult: setResultAC
  }
  )(App)