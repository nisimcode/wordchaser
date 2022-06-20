import React, {useEffect, useRef, useState} from "react";
import {Col, Row, Form} from "react-bootstrap";
import {msgColor, maxSecs, maxTries} from "./misc"
import Countdown from "./Countdown";

const vocab = require('./vocabulary.js').vocabulary
const rawVocab = require('./vocabulary.js').rawVocabulary

const pickRandomStarter = () =>
  rawVocab[Math.floor(Math.random() * rawVocab.length)]

const isLettersOnly = (str) => {
  return /^[a-zA-Z]+$/.test(str)
}

const Game = ({setMessage}) => {

  const usedWords = useRef([])
  const inputElement = useRef(null)
  const streak = useRef(0)
  const lastWordLength = useRef(0)
  const [lastWord, setLastWord] = useState(pickRandomStarter())
  const [tries, setTries] = useState(maxTries)
  const [points, setPoints] = useState(0)
  const [currentWord, setCurrentWord] = useState("")
  const [gameOver, setGameOver] = useState(false)


  const handlePass = () => {
    if (tries > 0) {
      setTries(tries - 1)
      setLastWord(pickRandomStarter())
    }
    else {
      setGameOver(true)
      messageSetter({text: "GAME OVER", color: msgColor.neutral})
      if (
        !window.localStorage.getItem("WordChaser High Score") ||
        points > parseInt(window.localStorage.getItem("WordChaser High Score"))
      ) {
        window.localStorage.setItem("WordChaser High Score", points.toString())
      }
    }
  }

  const messageSetter = (msg) => {
    setMessage(msg)
  }

  const checkLegal = () => {
    if (currentWord.length < 2)
      messageSetter({text: "Word must be 2 letters or longer", color: msgColor.negative})

    else if (!isLettersOnly(currentWord))
       messageSetter({text: "English letters only!", color: msgColor.negative})

    else if (usedWords.current.includes(currentWord))
       messageSetter({text: "Word already used", color: msgColor.negative})

    else if (
      (currentWord.length === lastWord.length) && (
        (() => {
          const currentArray = currentWord.split("")
          let count = 0
          for (let i = 0; i < currentWord.length; i++) {
            if (!lastWord.includes(currentArray[i]))
              count++
          }
          return count > 1
        })()
      )
    )
       messageSetter({text: "New word can only have one letter not in last word",
                      color: msgColor.negative})

    else if ((currentWord.length < lastWord.length) &&
      (currentWord.length - lastWord.length < -1))
       messageSetter({text: "New word length can only be one letter shorter than last word",
                      color: msgColor.negative})

    else if ((currentWord.length < lastWord.length) &&
      (!currentWord.split("").every(letter => lastWord.includes(letter))))
       messageSetter({text: "Last word must contain all letters of current word",
                      color: msgColor.negative})

    else if ((currentWord.length > lastWord.length) &&
      (currentWord.length - lastWord.length > 1))
       messageSetter({text: "New word length can only be one letter longer than last word",
                      color: msgColor.negative})

    else if ((currentWord.length > lastWord.length) &&
      (!lastWord.split("").every(letter => currentWord.includes(letter))))
       messageSetter({text: "New word must contain all letters of last word",
                      color: msgColor.negative})

    else if (!(vocab[currentWord[0] + currentWord[1]].includes(currentWord)))
       messageSetter({text: `'${currentWord}' isn't in our dictionary!`,
                      color: msgColor.negative})

    else return true
  }

  const calculateEarnedPoints = () => {
    let earnedPoints = 0
    if (currentWord.length > lastWordLength.current) {
      streak.current += 1
      earnedPoints = streak.current * currentWord.length
    } else if (currentWord.length === lastWordLength.current) {
      earnedPoints = streak.current * currentWord.length
      streak.current += 1
    } else if (currentWord.length < lastWordLength.current) {
      earnedPoints = currentWord.length
      streak.current = 0
    }
    return earnedPoints
  }

  const checkInput = () => {
    if (checkLegal()) {
      const earnedPoints = calculateEarnedPoints()
      messageSetter({text: `WELL DONE! Streak: ${streak.current}! Points: ${earnedPoints}`,
                    color: msgColor.positive})
      setPoints(points + earnedPoints)
      usedWords.current.push(currentWord)
      lastWordLength.current = currentWord.length
      setLastWord(currentWord)
    }
    setCurrentWord("")
  }

  useEffect(() => {
    inputElement.current.focus()
  })

  return (
    <div>
      <Row style={{width: '25%', paddingTop:'1%'}}>
        <Form >
          <Form.Group className="mb-3" controlId="formInput1" >
          <Form.Control
            style={{height: 50, width: 400, fontSize: 26 }} type="text" ref={inputElement}
            value={currentWord} placeholder={`${lastWord}`} disabled={gameOver}
            onChange={e => setCurrentWord(e.target.value.toLowerCase())}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault()
                checkInput()
              }
            }}
          />
          </Form.Group>
        </Form>
      </Row>
      <Row style={{width: '37%', paddingTop:'1%'}}>
        <Col>
          <Form.Group className="mb-3" controlId="formInput2">
            <Form.Label style={{paddingLeft: '23%', paddingRight: '23%'}}>Points</Form.Label>
            <Form.Control
            style={{height: 50, width: 80, textAlign: "center"}}
            value={points} disabled={true}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="formInput3">
            <Form.Label style={{paddingLeft: '23%', paddingRight: '23%'}}>Timer</Form.Label>
            <Countdown handlePass={handlePass} points={points} gameOver={gameOver} maxSecs={maxSecs} tries={tries}/>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="formInput2">
            <Form.Label style={{paddingLeft: '23%', paddingRight: '23%'}}>Tries</Form.Label>
            <Form.Control
            style={{height: 50, width: 80, textAlign: "center"}}  value={tries.toString()} disabled={true}
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  )
}

export default Game
