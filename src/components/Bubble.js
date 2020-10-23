import React from 'react'
import styled from 'styled-components'

const Container = styled.div({
  borderRadius: '50%',
  backgroundColor: 'white',
  border: 'solid 5px black',
  width: 150,
  height: 150,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

const Letter = styled.div({
  fontSize: 80,
  color: 'white',
  fontWeight: 'bold',
  '-webkit-text-stroke': '5px black',
  '-webkit-text-fill-color': 'white'
})

export default function Bubble ({ letter }) {
  return (
    <Container>
      <Letter>{letter}</Letter>
    </Container>
  )
}
