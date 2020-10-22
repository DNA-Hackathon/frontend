import React from 'react'
import styled from 'styled-components/macro'
import YoutubeBackground from 'react-youtube-background'
import HandAwareWebcam from './components/HandAwareWebcam'
import Score from './components/Score'
import Bubble from './components/Bubble'
import Prediction from './components/Prediction'

const Container = styled.div({
  width: '100%',
  height: '100%'
})

function App () {
  const [currentPrediction, setCurrentPrediction] = React.useState()

  const predict = React.useCallback(async (img, predictions) => {
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
    setCurrentPrediction(body.prediction)
  }, [])

  return (
    <Container>
      <YoutubeBackground
        videoId='Oe3FG4EOgyU'
        style={{ height: '100%', width: '100%' }}
      >
        <Score score={100} />

        <div>
          <Bubble letter='A' />
          <Bubble letter='F' />
          <Bubble letter='K' />
        </div>

        <Prediction prediction={currentPrediction} />

        <HandAwareWebcam
          style={{ position: 'absolute', left: 50 }}
          onHandRecognized={predict}
        />
      </YoutubeBackground>
    </Container>
  )
}

export default App
