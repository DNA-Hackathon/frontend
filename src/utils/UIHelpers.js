export function getRandomInt (max) {
  return Math.floor(Math.random() * Math.floor(max))
}

export function dist (x1, x2, y1, y2) {
  const a = x1 - x2
  const b = y1 - y2
  return Math.sqrt(a * a + b * b)
}

export function getRandomLetter () {
  const alphabet = 'abcdefghiklmnopqrstuvwxy'
  return alphabet[Math.floor(Math.random() * alphabet.length)]
}

export function generateRandomLetters (
  size,
  canvasWidth,
  canvasHeight,
  letterSize
) {
  const lettersTmp = []
  let counter = 0
  while (lettersTmp.length < size) {
    let letter = {
      x: getRandomInt(canvasWidth - letterSize),
      y: getRandomInt(canvasHeight - letterSize),
      r: letterSize,
      value: getRandomLetter(),
      active: false
    }
    let overlapping = false
    // check that it is not overlapping with any existing circle
    // another brute force approach
    for (let i = 0; i < lettersTmp.length; i++) {
      let existing = lettersTmp[i]
      let d = dist(letter.x, existing.x, letter.y, existing.y)
      if (d < letter.r + existing.r) {
        // They are overlapping
        overlapping = true
        // do not add to array
        break
      }
    }
    // add valid circles to array
    if (!overlapping) {
      lettersTmp.push(letter)
    }
    counter++
  }
  for (let i = 0; i < size; i++) {
    lettersTmp.push()
  }
  return lettersTmp
}
