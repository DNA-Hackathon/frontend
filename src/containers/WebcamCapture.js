import React from 'react'
import Webcam from 'react-webcam'

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user'
}

const WebcamCapture = ({ onCapture }) => {
  const webcamRef = React.useRef(null)

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot()
    const image = new Image(1280, 720)
    image.src = imageSrc
    image.onload = () => onCapture(image)
  }, [webcamRef, onCapture])

  return (
    <>
      <Webcam
        audio={false}
        width={800}
        height={600}
        ref={webcamRef}
        screenshotFormat='image/png'
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>Capture photo</button>
    </>
  )
}

export default WebcamCapture
