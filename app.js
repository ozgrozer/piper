const options = {
  length: 16,
  lowercase: true,
  uppercase: true,
  digits: true,
  symbols: true
}

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const generatePassword = length => {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const digits = '0123456789'
  const symbols = '!"#$%&\'()*+,-./:;<=>?@[\]^_`{|}~'

  let characters = ''
  if (options.lowercase) characters += lowercase
  if (options.uppercase) characters += uppercase
  if (options.digits) characters += digits
  if (options.symbols) characters += symbols

  let result = ''
  for (let i = 0; i < length; i++) {
    const randomCharacterNumber = randomNumber(0, characters.length)
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
