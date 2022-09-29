import React, { useEffect, useState } from 'react';
import './App.css';
import { BorderPart } from './components/border';
import { FormPart } from './components/formpart';
import { connect } from 'react-redux'
import { setCellsAC, setTurnAC, setForSignInAC } from './redux/main-reducer';
import { InfoAboutGame } from './components/infoaboutgame';
import { SignInPart } from './components/signinpart';
import { Disconnect } from './components/disconnect';


function App({cellsArray, setCells, socket, setTurn, turn , isAuth, setForSignIn}) {
  const [isDisconnected, setToDisconnect] = useState(false);
  useEffect(() => {
    socket.on('connect', () => {
      console.log("user connected")
    });
   socket.on('disconnect_excessive', () => {
    setToDisconnect(true);
    socket.close()
   })
    socket.on('the_last_emit', (data) => {
      if (data.userId) {
        alert(`user ${data.userId} wins`)
      } else {
        alert('draw')
      }
    })
    socket.on('opponent_disconnected', () => {
      alert("your opponent was disconnected")
      window.location.reload()
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
        <SignInPart setForSignIn={setForSignIn} socket={socket}/>
        :
        !cellsArray ? 
        <FormPart setCells={setCells} socket={socket} />
        :
        <>
          <InfoAboutGame turn={turn} />
          <BorderPart 
              cellsArray={cellsArray} 
              setCells={setCells} 
              socket={socket} 
              turn={turn}
              setTurn={setTurn}
              />
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
    seconds: state.main.seconds
  }
}
export default connect(
  mapStateToProps,
  {
    setCells: setCellsAC,
    setTurn: setTurnAC,
    setForSignIn: setForSignInAC
  }
  )(App)