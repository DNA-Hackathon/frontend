import React from 'react'
import styled from 'styled-components/macro'

const ScoreContainer = styled.div({
  position: 'absolute',
  right: 50,
  color: 'white',
  fontSize: 120,
  fontWeight: 'bold',
  '-webkit-text-stroke': '5px black',
  '-webkit-text-fill-color': 'white',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
})

export default function Score ({ score }) {
  return (
    <ScoreContainer>
      <span>Score</span>
      <span style={{ marginTop: -50 }}>{score}</span>
    </ScoreContainer>
  )
}
