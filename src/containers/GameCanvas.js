import React, { useEffect } from 'react'
import styled from 'styled-components'
import { generateRandomLetters, getRandomInt } from '../utils/UIHelpers'
import HandAwareWebcam from '../components/HandAwareWebcam'
import Score from '../components/Score'
import Letter, { letterSize } from '../components/Letter'
import Prediction from '../components/Prediction'
import BackgroundVideo from '../resources/BabyShark.mp4'

const letterCount = 10
const canvasWidth = window.innerWidth
const canvasHeight = window.innerHeight
const timeInterval = 5000

const StartGameText = styled.div`
  position: absolute;
  right: 60px;
  bottom: 40px;
  text-align: center;
  color: white;
  font-size: 120px;
  font-weight: bold;
  -webkit-text-stroke: 3px black;
  -webkit-text-fill-color: white;
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
`

export default function GameCanvas () {
  const [letters, setLetters] = React.useState([])
  const [activeLetterIndex, setActiveLetterIndex] = React.useState(0)
  const [gameStarted, setGameStarted] = React.useState(false)
  const [currentPrediction, setCurrentPrediction] = React.useState()
  const [isCorrect, setIsCorrect] = React.useState(null)
  const [score, setScore] = React.useState(0)

  const canvasRef = React.useRef(null)
  const intervalId = React.useRef(0)
  const videoRef = React.useRef(null)

  const predict = React.useCallback(
    async (img, predictions) => {
      const payload = {
        image: img,
        bbox: predictions[0]?.bbox
      }

      const response = await fetch(
        'https://team4-backend.scapp.swisscom.com/game/compute',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        }
      )

      const body = await response.json()
      const prediction = body.prediction

      console.log(prediction)
      console.log(letters)
      console.log(activeLetterIndex)
      console.log(letters[activeLetterIndex])

      let activeLetter = letters[activeLetterIndex]
      if (
        activeLetter !== null &&
        prediction.toLowerCase() === activeLetter.value.toLowerCase()
      ) {
        setIsCorrect('correct')
        setScore(score + 10)
      } else if (gameStarted) {
        setScore(score - 10)
        setIsCorrect('not correct')
      }
      setCurrentPrediction(body.prediction)
    },
    [gameStarted, letters, activeLetterIndex, score, setIsCorrect, setScore]
  )

  const setLetterActive = () => {
    const newLetters = [...letters]
    if (letters.length > 0) {
      const index = getRandomInt(letters.length)
      const item = { ...newLetters[index] }
      const previousItem = { ...newLetters[activeLetterIndex] }
      if (item === previousItem) {
        setLetterActive()
      }
      item.active = true
      previousItem.active = false
      newLetters[index] = item
      newLetters[activeLetterIndex] = previousItem
      setActiveLetterIndex(index)
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
    if (e.keyCode === 32) {
      if (!gameStarted) {
        videoRef.current.play()
        setGameStarted(true)
        setLetterActive()
        intervalId.current = setInterval(() => setLetterActive(), timeInterval)
      } else {
        videoRef.current.pause()
        clearInterval(intervalId.current)
        setGameStarted(false)
      }
    }
  }

  return (
    <Canvas ref={canvasRef} onKeyDown={toggleGame} tabIndex='0'>
      <video
        ref={videoRef}
        loop
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          left: '50%',
          top: '50%',
          objectFit: 'cover',
          transform: 'translate(-50%, -50%)',
          zIndex: -1
        }}
      >
        <source src={BackgroundVideo} type='video/mp4' />
      </video>
      <Score score={score} />
      <Prediction prediction={currentPrediction} correct={isCorrect} />
      <WebcamFrame>
        <HandAwareWebcam
          style={{ position: 'absolute' }}
          onHandRecognized={predict}
        />
      </WebcamFrame>

      {!gameStarted && <StartGameText>Press space</StartGameText>}
      {letters &&
        letters.map((value, index) => (
          <Letter
            key={index}
            x={value.x}
            y={value.y}
            active={value.active}
            value={value.value}
            time={timeInterval}
          />
        ))}
    </Canvas>
  )
}
