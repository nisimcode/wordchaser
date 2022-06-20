import React, {useEffect} from "react"
import {msgColor} from "./misc"


const Messenger = ({message, setMessage}) => {

  const returnText = () => {
    if (message.text) return message.text
    else return (<><br/> <br/></>)
  }

  useEffect(() => {
    const timerId = setTimeout(() => setMessage({text: "", color: msgColor.clear}), 5_000)
    return () => clearTimeout(timerId)
  })

  return (
    <div style={{height: 100}}>
    <h5 style={{width: '25%', paddingTop:'2%', color: message.color}}>
      {returnText()} </h5>
    </div>
  )
}

export default Messenger