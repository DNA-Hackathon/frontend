import React from 'react'
import styled from 'styled-components'
import YoutubeBackground from 'react-youtube-background'
import HandAwareWebcam from './components/HandAwareWebcam'
import Score from './components/Score'

function App () {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <YoutubeBackground
        videoId='Oe3FG4EOgyU'
        style={{ height: '100%', width: '100%' }}
      >
        <Score score={100} />

        <HandAwareWebcam
          style={{ position: 'absolute', x: 50 }}
          onHandRecognized={(img, predictions) => console.log(img, predictions)}
        />
      </YoutubeBackground>
    </div>
  )
}

export default App
