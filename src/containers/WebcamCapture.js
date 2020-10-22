import React from 'react'
import Webcam from 'react-webcam'

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user'
}

const WebcamCapture = ({ onCapture, width, height }) => {
  const webcamRef = React.useRef(null)
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot()
    const image = new Image()
    image.src = imageSrc
    onCapture(image)
  }, [webcamRef, onCapture])

  return (
    <>
      <Webcam
        audio={false}
        height={height}
        ref={webcamRef}
        screenshotFormat='image/jpeg'
        width={width}
        videoConstraints={videoConstraints}
      />
    </>
  )
}

export default WebcamCapture
