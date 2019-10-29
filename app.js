const options = {
  length: 16,
  digits: 4,
  symbols: 4
}

const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

const generatePassword = passwordLength => {
  const numberChars = "0123456789"
  const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const lowerChars = "abcdefghiklmnopqrstuvwxyz"
  const allChars = numberChars + upperChars + lowerChars
  let randPasswordArray = Array(passwordLength)
  randPasswordArray[0] = numberChars
  randPasswordArray[1] = upperChars
  randPasswordArray[2] = lowerChars
  randPasswordArray = randPasswordArray.fill(allChars, 3)
  const result = shuffleArray(randPasswordArray.map(x => {
    return x[Math.floor(Math.random() * x.length)]
  })).join('')
  return result
}

const generatedPasswordSelector = document.getElementById('generatedPassword')
const passwordGenerator = () => {
  const newPassword = generatePassword(options.length)
  generatedPasswordSelector.value = newPassword
}

const rangeListener = function () {
  window.requestAnimationFrame(() => {
    const getValue = parseInt(this.value)
    if (getValue) {
      const getId = this.getAttribute('data-id')
      const optionValue = document.getElementById(getId + 'Value')
      optionValue.innerHTML = getValue

      options[getId] = getValue

      passwordGenerator()
    }
  })
}

const ranges = document.getElementsByClassName('optionRange')
for (let i = 0; i < ranges.length; i++) {
  const range = ranges[i]
  range.addEventListener('mousedown', () => {
    rangeListener()
    range.addEventListener('mousemove', rangeListener)
  })
  range.addEventListener('mouseup', () => {
    range.removeEventListener('mousemove', rangeListener)
  })
  range.addEventListener('keydown', rangeListener)
  range.addEventListener('change', rangeListener)
}
