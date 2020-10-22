import React, { useEffect } from 'react'
import styled from 'styled-components'
import WebcamCapture from './WebcamCapture'
import { generateRandomLetters } from '../utils/UIHelpers'

const letterSize = 90
const webcamWidth = '400px'
const webcamHeight = '200px'
const letterCount = 10
const canvasWidth = 1280
const canvasHeight = 720

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
  font-size: 30px;
  border: 3px solid white;
`

export default function GameCanvas () {
  const [letterPositions, setLetterPositions] = React.useState()
  const canvasRef = React.useRef(null)

  const initializeLetters = () => {
    setLetterPositions(
      generateRandomLetters(letterCount, canvasWidth, canvasHeight, letterSize)
    )
  }

  useEffect(() => {
    initializeLetters()
    console.log(letterPositions)
  }, [])

  return (
    <Canvas>
      {letterPositions &&
        letterPositions.map((value, index) => (
          <Letter style={{ bottom: value.y, left: value.x }}>
            {value.value}
          </Letter>
        ))}
      <WebcamFrame>
        {/* <WebcamCapture width={webcamWidth} height={webcamHeight} /> */}
      </WebcamFrame>
    </Canvas>
  )
}
