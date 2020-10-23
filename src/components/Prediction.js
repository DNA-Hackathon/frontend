import React from 'react'
import styled from 'styled-components'

const Container = styled.div({
  position: 'absolute',
  left: 50,
  bottom: 280
})

const Title = styled.div({
  fontSize: 80,
  color: 'white',
  fontWeight: 'bold',
  '-webkit-text-stroke': '5px black',
  '-webkit-text-fill-color': 'white'
})

const Value = styled.div({
  fontSize: 32,
  color: 'white',
  fontWeight: 'bold',
  '-webkit-text-stroke': '2px black',
  '-webkit-text-fill-color': 'white'
})

export default function Prediction ({ prediction, correct }) {
  return (
    <Container>
      <Title>
        AI
        <span role='img' aria-label='AI'>
          🤖
        </span>{' '}
        identifies
      </Title>
      <Value
        style={{
          color: correct === 'correct' ? 'green' : 'red'
        }}
      >
        {prediction} {correct && correct}
      </Value>
    </Container>
  )
}
