import React from 'react'
import {msgColor} from "./misc"


const Welcome = () => {
  return (
    <div style={{paddingTop: '2%'}}>
      <h2 style={{color: msgColor.neutral}}>
        High Score: {window.localStorage.getItem("WordChaser High Score")}
      </h2>
      <h6>You start with a 3 letter word on the screen (which you can use)</h6>
      <h6>You can create a new word by changing the last legal word by:</h6>
      <h6>&emsp;* rearranging its letters</h6>
      <h6>&emsp;* adding, removing or changing a single letter</h6>
      <h6>&emsp;* combining the two methods above </h6>
      <h6>You get bonus points each time you don't create a shorter word</h6>
      <h6>You have 15 seconds each time to create a new world </h6>
      <h6>Fail 3 times and the game is over </h6>
      <h6>Enjoy!</h6>
    </div>
  )
}

export default Welcome
