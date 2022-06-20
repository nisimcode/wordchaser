import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Game from "./Game";
import Header from "./Header";
import Container from "react-bootstrap/Container";
import Messenger from "./Messenger";
import {msgColor} from "./misc"
import Welcome from "./Welcome";


export const App = () => {

  const [message, setMessage] = useState({text: "", color: msgColor.clear})

  return (
    <Container>
      <Header />
      <Game setMessage={setMessage} />
      <Messenger message={message} setMessage={setMessage}/>
      <Welcome />
    </Container>
  )
}





