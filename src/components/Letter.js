import React from 'react'
import styled from 'styled-components'

export const letterSize = 180

const LetterComp = styled.div`
  background: white;
  position: absolute;
  display: block;
  width: ${letterSize}px;
  height: ${letterSize}px;
  text-align: center;
  line-height: ${letterSize}px;
  border-radius: ${letterSize / 2 + 7}px;
  font-size: 80px;
  border: 7px solid black;
  color: white;
  font-weight: bold;
  -webkit-text-stroke: 3px black;
  -webkit-text-fill-color: white;
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
