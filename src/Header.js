import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const Header = () => (
  <div>
    <Navbar>
      <Navbar.Brand> WordChaser </Navbar.Brand>
      <Navbar.Toggle />
      <Nav.Link href="/">New Game</Nav.Link>
    </Navbar>
  </div>
)

export default Header


// import Button from 'react-bootstrap/Button'
// import axios from 'axios'
// import React, {useEffect, useState} from 'react';

 // const [loggedIn, setLoggedIn] = useState(false)
    // const [username, setUsername] = useState("")
    //
    // useEffect( () => {
    //     const token = window.localStorage.getItem('token')
    //     if (token) {
    //       axios.get(CURRENT_USER_URL, getToken())
    //       .then(response => {
    //         if (response.statusText === 'OK') {
    //             localStorage.setItem('username', response.data.username)
    //             localStorage.setItem('userId', response.data.userId)
    //             setLoggedIn(true)
    //             setUsername(response.data.username)
    //         }
    //       })
    //   }}, []
    // )
    //
    //   const handleSignOut = (event) => {
    //       event.preventDefault()
    //       window.localStorage.removeItem("token")
    //       window.localStorage.removeItem("username")
    //       window.localStorage.removeItem("userId")
    //       setLoggedIn(false)
    //       window.location.href='/'
    // }

 // <Nav.Link href="/jokes">Jokes</Nav.Link>
 //        <Nav.Link href="/numtastic">Numtastic</Nav.Link>
 //        <Nav.Link href="/contact_us">Contact us</Nav.Link>
 //        <Navbar.Collapse className="justify-content-end">
 //        { loggedIn &&
 //          <Navbar.Text style={{fontSize:"20px"}}>
 //              Hello, {username}
 //              &emsp;
 //               <Button
 //                   data-tip="Leaving so soon?"
 //                   variant="outline-secondary"
 //                   size='sm'
 //                   onClick={handleSignOut}>
 //                   Sign out
 //               </Button>
 //              <ReactTooltip place={"bottom"} type={"error"} multiline={true}/>
 //          </Navbar.Text> }
 //        { !loggedIn &&
 //          <Navbar.Text>
 //              <Button
 //                  variant="outline-primary"
 //                  size='sm'
 //                  onClick={() => {window.localStorage.setItem("sender", window.location.href);
 //                                  window.location.href='/signin';
 //                                  }}>
 //                  Sign in
 //              </Button>
 //          </Navbar.Text> }
 //        </Navbar.Collapse>