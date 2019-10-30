const options = {
  length: 16,
  digits: 4,
  symbols: 4
}

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const generatePassword = length => {
  let result = ''
  const characters = 'abcdefghijklmnopqrstuvwxyz'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    const randomCharacterNumber = randomNumber(0, charactersLength)
    result += characters.charAt(randomCharacterNumber)
  }
  return result
}

const generatedPasswordSelector = document.getElementById('generatedPassword')
const passwordGenerator = () => {
  const newPassword = generatePassword(options.length)
  generatedPasswordSelector.value = newPassword
}
passwordGenerator()

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
