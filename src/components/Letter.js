import React from 'react'
import styled from 'styled-components'

export const letterSize = 90

const LetterComp = styled.div`
  background: black;
  position: absolute;
  display: block;
  width: ${letterSize}px;
  height: ${letterSize}px;
  color: white;
  text-align: center;
  line-height: ${letterSize}px;
  border-radius: ${letterSize / 2 + 3}px;
  font-size: 50px;
  border: 3px solid white;
`

export default function Letter ({ y, x, active, value }) {
  return (
    <LetterComp
      style={{
        bottom: y,
        left: x,
        visibility: active ? 'visible' : 'hidden'
      }}
    >
      {value}
    </LetterComp>
  )
}
