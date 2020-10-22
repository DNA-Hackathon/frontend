import React from 'react'
import WebcamCapture from './WebcamCapture'
import * as handTrack from 'handtrackjs'
import { isEmpty } from 'lodash'

const modelParams = {
  flipHorizontal: false, // flip e.g for video
  imageScaleFactor: 0.7, // reduce input image size for gains in speed.
  maxNumBoxes: 1, // maximum number of boxes to detect
  iouThreshold: 0.5, // ioU threshold for non-max suppression
  scoreThreshold: 0.4 // confidence threshold for predictions.
}

const HanddetectionScreen = () => {
  const model = React.useRef()
  const canvas = React.useRef()

  const cropImage = (image, bbox) => {
    console.log('Found hand on:', bbox)
    const x = bbox[0]
    const y = bbox[1]
    const width = bbox[2]
    const height = bbox[3]

    const ctx = canvas.current.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(
      image,
      x,
      y, // Start at x/y pixels from the left and the top of the image (crop),
      width,
      height, // "Get" a `50 * 50` (w * h) area from the source image (crop),
      0,
      0, // Place the result at 0, 0 in the canvas,
      400,
      300
    ) // With as width / height: 100 * 100 (scale)
  }

  React.useEffect(() => {
    handTrack.load(modelParams).then(lmodel => {
      model.current = lmodel
      console.log('Model loaded...')
    })
  }, [model])

  const detectHand = capturedImage => {
    model.current.detect(capturedImage).then(predictions => {
      if (!isEmpty(predictions)) {
        cropImage(capturedImage, predictions[0]['bbox'])
      }
    })
  }

  return (
    <>
      <WebcamCapture onCapture={detectHand} />
      <canvas ref={canvas}></canvas>
    </>
  )
}

export default HanddetectionScreen
