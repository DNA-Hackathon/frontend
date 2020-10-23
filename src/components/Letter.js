import React from 'react'
import styled from 'styled-components'

export const letterSize = 180

const LetterComp = styled.div`
  position: absolute;
  background: rgba(255, 255, 255, 0.8);
  background-image: url("signs/${props => props.letter}.png");
  display: block;
  width: ${letterSize}px;
  height: ${letterSize}px;
  text-align: center;
  line-height: ${letterSize}px;
  border-radius: ${letterSize / 2 + 7}px;
  font-size: 120px;
  border: 7px solid black;
  color: white;
  font-weight: bold;
  -webkit-text-stroke: 3px black;
  -webkit-text-fill-color: white;
`

export default function Letter ({ y, x, active, value, time }) {
  const [seconds, setSeconds] = React.useState(time / 1000)

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (!active) {
        setSeconds(time / 1000)
      } else {
        if (seconds > 0) {
          setSeconds(seconds => seconds - 1)
        }
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [active])

  return (
    <LetterComp
      letter={value}
      style={{
        bottom: y,
        left: x,
        visibility: active ? 'visible' : 'hidden'
      }}
    >
      <span>{value.toUpperCase()}</span>
      <span style={{ fontSize: 32 }}>{seconds}</span>
    </LetterComp>
  )
}
