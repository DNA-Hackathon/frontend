import React, { useEffect } from 'react'
import styled from 'styled-components'
import { generateRandomLetters, getRandomInt } from '../utils/UIHelpers'
import YoutubeBackground from 'react-youtube-background'
import HandAwareWebcam from '../components/HandAwareWebcam'
import Score from '../components/Score'
import Letter, { letterSize } from '../components/Letter'

const letterCount = 10
const canvasWidth = 1000
const canvasHeight = 800
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
  bottom: -8px;
  left: -8px;
`

const Canvas = styled.div`
  width: ${canvasWidth}px;
  height: ${canvasHeight}px;
  position: relative;
  border: 5px solid black;
  margin: 100px auto 0 auto;
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
      <YoutubeBackground
        videoId='Oe3FG4EOgyU'
        style={{ height: '100%', width: '100%' }}
      >
        <Score score={100} />
        <WebcamFrame>
          <HandAwareWebcam
            style={{ position: 'absolute' }}
            onHandRecognized={(img, predictions) =>
              console.log(img, predictions)
            }
          />
        </WebcamFrame>
      </YoutubeBackground>

      {!gameStarted && (
        <StartGameText>Press space to start the game</StartGameText>
      )}
      {letters &&
        letters.map((value, index) => (
          <Letter
            x={value.x}
            y={value.y}
            active={value.active}
            value={value.value}
          />
        ))}
    </Canvas>
  )
}
