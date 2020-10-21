import React, { useEffect, useRef } from 'react'
import WebcamCapture from './WebcamCapture'
import * as handTrack from 'handtrackjs'
import * as tf from '@tensorflow/tfjs'

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

  const cropImage = (image, coordinates) => {
    const x = coordinates[0]
    const y = coordinates[1]
    const width = coordinates[2]
    const height = coordinates[3]
    const boxes = [
      [y / height, x / width, (y + height) / height, (x + width) / width]
    ]
    console.log(boxes)
    const tensor = tf.browser.fromPixels(image)
    const tensor4dInt = tensor.as4D(
      1,
      tensor.shape[0],
      tensor.shape[1],
      tensor.shape[2]
    )
    const tensor4dFloat = tensor4dInt.div(255)
    tensor4dFloat.print()
    let cropped_tensor = tf.image.cropAndResize(
      tensor4dFloat,
      boxes,
      [0],
      [width, height],
      'nearest'
    )
    cropped_tensor.print()
    let canvas = document.getElementsByTagName('canvas')[0]
    return tf.browser.toPixels(
      cropped_tensor.reshape([
        cropped_tensor.shape[1],
        cropped_tensor.shape[2],
        cropped_tensor.shape[3]
      ]),
      canvas
    )
  }

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
          cropImage(capturedImage, predictions[0]['bbox']).then(
            croppedImage => {
              console.log(croppedImage)
              setImage(croppedImage)
            }
          )
        }
      })
    }
  }

  return (
    <>
      <WebcamCapture onCapture={detectHand} />
      <canvas></canvas>
      {image && <img src={image.src} />}
    </>
  )
}

export default HanddetectionScreen
