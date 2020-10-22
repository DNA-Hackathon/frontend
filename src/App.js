import React from 'react'
import styled from 'styled-components'
// import HanddetectionScreen from './containers/HanddetectionScreen'

import * as handTrack from 'handtrackjs'

const Video = styled.video({
  // height: 200,
  // width: 355,
  border: 'solid 5px black',
  borderRadius: 5,
  padding: 0
})

function App () {
  const webcam = React.useRef()
  const model = React.useRef()

  React.useEffect(() => {
    var constraints = { audio: false, video: { width: 355, height: 200 } }
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (mediaStream) {
        webcam.current.srcObject = mediaStream
        webcam.current.onloadedmetadata = () => webcam.current.play()
      })
      .catch(function (err) {
        console.log(err.name + ': ' + err.message)
      })
  }, [])

  React.useEffect(() => {
    handTrack.load().then(handModel => {
      console.log('model loaded...')
      model.current = handModel
    })
  }, [webcam])

  React.useEffect(() => {
    const detect = () => {
      model.current.detect(webcam.current).then(predictions => {
        console.log('Predictions: ', predictions)
      })
    }

    const interval = setInterval(() => detect(), 500)
    return () => {
      clearInterval(interval)
    }
  }, [model])

  return (
    <div className='App'>
      {/* <HanddetectionScreen /> */}
      <Video ref={webcam} width='355px' height='200px'></Video>
    </div>
  )
}

export default App
