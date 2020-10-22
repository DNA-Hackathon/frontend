import React, { useEffect } from 'react'
import styled from 'styled-components'
import WebcamCapture from './WebcamCapture'
import { generateRandomLetters, getRandomInt } from '../utils/UIHelpers'

const letterSize = 90
const webcamWidth = '400px'
const webcamHeight = '200px'
const letterCount = 10
const canvasWidth = 1000
const canvasHeight = 600
const timeInterval = 4000

const StartGameText = styled.div`
  position: absolute;
  bottom: ${canvasHeight / 2}px;
  left: ${canvasWidth / 2 - 120}px;
  text-align: center;
  font-size: 20px;
  color: white;
`

const WebcamFrame = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
`

const Canvas = styled.div`
  width: ${canvasWidth}px;
  height: ${canvasHeight}px;
  position: relative;
  border: 5px solid black;
  background-color: green;
  margin: 100px auto 0 auto;
`

const Letter = styled.div`
  background: black;
  position: absolute;
  display: block;
  width: ${letterSize}px;
  height: ${letterSize}px;
  color: white;
  text-align: center;
  line-height: ${letterSize}px;
  border-radius: ${letterSize / 2 + 3}px;
  font-size: 50px;
  border: 3px solid white;
`

export default function GameCanvas () {
  const [letters, setLetters] = React.useState([])
  const [activeLetterIndex, setActiveLetterIndex] = React.useState(0)
  const canvasRef = React.useRef(null)
  const intervalId = React.useRef(0)
  const [gameStarted, setGameStarted] = React.useState(false)

  const setLetterActive = () => {
    const newLetters = [...letters]
    if (letters.length > 0) {
      let updated = false
      let counter = 0
      while (!updated) {
        const index = getRandomInt(letters.length)
        const item = { ...newLetters[index] }
        const previousItem = { ...newLetters[activeLetterIndex] }
        if (!item.active || counter == letters.length - 1) {
          item.active = true
          previousItem.active = false
          newLetters[index] = item
          newLetters[activeLetterIndex] = previousItem
          setActiveLetterIndex(index)
          updated = true
        } else {
          counter++
        }
      }
    }
    setLetters(newLetters)
  }

  const initializeLetters = () => {
    setLetters(
      generateRandomLetters(letterCount, canvasWidth, canvasHeight, letterSize)
    )
  }

  useEffect(() => {
    canvasRef.current.focus()
    initializeLetters()
  }, [])

  const toggleGame = e => {
    if (e.keyCode == 32) {
      if (!gameStarted) {
        setGameStarted(true)
        setLetterActive()
        intervalId.current = setInterval(() => setLetterActive(), timeInterval)
      } else {
        clearInterval(intervalId.current)
        setGameStarted(false)
      }
    }
  }

  return (
    <Canvas ref={canvasRef} onKeyDown={toggleGame} tabIndex='0'>
      {!gameStarted && (
        <StartGameText>Press space to start the game</StartGameText>
      )}
      {letters &&
        letters.map((value, index) => (
          <Letter
            style={{
              bottom: value.y,
              left: value.x,
              visibility: value.active ? 'visible' : 'hidden'
            }}
          >
            {value.value}
          </Letter>
        ))}
      <WebcamFrame>
        {/* <WebcamCapture width={webcamWidth} height={webcamHeight} /> */}
      </WebcamFrame>
    </Canvas>
  )
}
