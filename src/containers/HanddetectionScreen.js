import React, { useEffect, useRef } from 'react'
import WebcamCapture from './WebcamCapture'
import * as handTrack from 'handtrackjs'
import { send_image_and_bbox } from '../utils/RequestHandling'

const modelParams = {
  flipHorizontal: true, // flip e.g for video
  imageScaleFactor: 0.7, // reduce input image size for gains in speed.
  maxNumBoxes: 1, // maximum number of boxes to detect
  iouThreshold: 0.5, // ioU threshold for non-max suppression
  scoreThreshold: 0.4 // confidence threshold for predictions.
}

const HanddetectionScreen = () => {
  const [image, setImage] = React.useState(null)
  const model = useRef()

  useEffect(() => {
    handTrack.load(modelParams).then(lmodel => {
      model.current = lmodel
      console.log('Model loaded')
    })
  }, [model])

  const detectHand = capturedImage => {
    setImage(capturedImage)
    capturedImage.onload = () => {
      model.current.detect(capturedImage).then(predictions => {
        if (predictions) {
          setImage(capturedImage)
          send_image_and_bbox(capturedImage.src, predictions['bbox']).then(
            response => {
              console.log(response.json())
            }
          )
        }
      })
    }
  }

  return (
    <>
      <WebcamCapture onCapture={detectHand} />
      {image && <img src={image.src} />}
    </>
  )
}

export default HanddetectionScreen
