import React from 'react'
import styled from 'styled-components'

const ScoreContainer = styled.div({
  color: 'white',
  fontSize: 128,
  '-webkit-text-stroke': '2px black',
  '-webkit-text-fill-color': 'white'
})

export default function Score ({ score }) {
  return <ScoreContainer>{score}</ScoreContainer>
}
