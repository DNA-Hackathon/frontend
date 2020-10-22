import React from 'react'
import styled from 'styled-components'
import * as handTrack from 'handtrackjs'
import { isEmpty } from 'lodash'

const Video = styled.video({
  position: 'absolute',
  left: 50,
  bottom: 50,
  border: 'solid 5px black',
  borderRadius: 5,
  padding: 0
})

const modelParams = {
  flipHorizontal: true, // flip e.g for video
  imageScaleFactor: 0.7, // reduce input image size for gains in speed.
  maxNumBoxes: 1, // maximum number of boxes to detect
  iouThreshold: 0.5, // ioU threshold for non-max suppression
  scoreThreshold: 0.6 // confidence threshold for predictions.
}

export default function HandAwareWebcam ({ onHandRecognized }) {
  const webcam = React.useRef()
  const model = React.useRef()
  const canvas = React.useRef()

  React.useEffect(() => {
    var constraints = { audio: false, video: { width: 355, height: 200 } }
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(mediaStream => {
        webcam.current.srcObject = mediaStream
        webcam.current.onloadedmetadata = () => webcam.current.play()
      })
      .catch(function (err) {
        console.log(err.name + ': ' + err.message)
      })
  }, [])

  React.useEffect(() => {
    handTrack.load(modelParams).then(handModel => {
      console.log('model loaded...')
      model.current = handModel
    })
  }, [])

  React.useEffect(() => {
    const detect = () => {
      document.readyState === 'complete' && // Suuuuper ugly hack
        webcam.current &&
        model.current &&
        model.current.detect(webcam.current).then(predictions => {
          if (!isEmpty(predictions)) {
            const ctx = canvas.current.getContext('2d')
            ctx.scale(-1, 1)
            ctx.drawImage(webcam.current, 0, 0, 335 * -1, 200)
            ctx.beginPath()
            ctx.rect(...predictions[0].bbox)
            ctx.stroke()
            onHandRecognized(canvas.current.toDataURL(), predictions)
          }
        })
    }

    const interval = setInterval(() => detect(), 500)
    return () => {
      clearInterval(interval)
    }
  }, [model, webcam, onHandRecognized])

  return (
    <>
      <Video ref={webcam} width='355px' height='200px'></Video>
      <canvas
        ref={canvas}
        height='480'
        width='640'
        style={{ display: 'none' }}
      ></canvas>
    </>
  )
}
