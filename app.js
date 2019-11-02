if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
}

let generatedPassword = ''

const writeCookie = props => {
  const theDate = new Date()
  const oneYearLater = new Date(theDate.getTime() + 31536000000)
  const expiryDate = oneYearLater.toGMTString()
  document.cookie = props.key + '=' + props.value + '; expires=' + expiryDate + '; path=/'
}

const readCookie = props => {
  const getCookie = document.cookie.match('(^|;)\\s*' + props.key + '\\s*=\\s*([^;]+)')
  return getCookie ? JSON.parse(getCookie.pop()) : ''
}

const copyToClipboard = str => {
  const el = document.createElement('textarea')
  el.value = str
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}

const scorePassword = password => {
  let score = 0
  if (!password) return score

  const letters = {}
  for (let i = 0; i < password.length; i++) {
    letters[password[i]] = (letters[password[i]] || 0) + 1
    score += 5.0 / letters[password[i]]
  }

  const variations = {
    digits: /\d/.test(password),
    lower: /[a-z]/.test(password),
    upper: /[A-Z]/.test(password),
    nonWords: /\W/.test(password)
  }

  variationCount = 0
  for (let check in variations) {
    variationCount += (variations[check] == true) ? 1 : 0
  }
  score += (variationCount - 1) * 10

  return parseInt(score)
}
const checkPasswordStrength = score => {
  let result = ''
  if (score >= 80) {
    result = 'secure'
  } else if (score >= 60) {
    result = 'strong'
  } else if (score >= 50) {
    result = 'average'
  } else if (score >= 0) {
    result = 'weak'
  }
  return result
}
const scorePasswordDom = password => {
  const _scorePassword = scorePassword(password)
  const _checkPasswordStrength = checkPasswordStrength(_scorePassword)
  document.getElementById('passwordStrength').setAttribute('title', _scorePassword)
  document.getElementById('passwordStrengthTrack').style.width = _scorePassword + '%'
  document.getElementById('passwordStrengthTrack').className = _checkPasswordStrength
}

const getCookie = {
  length: readCookie({ key: 'length' }),
  lowercase: readCookie({ key: 'lowercase' }),
  uppercase: readCookie({ key: 'uppercase' }),
  digits: readCookie({ key: 'digits' }),
  symbols: readCookie({ key: 'symbols' })
}

const options = {
  length: getCookie.length || 16,
  lowercase: getCookie.lowercase !== false,
  uppercase: getCookie.uppercase || false,
  digits: getCookie.digits || false,
  symbols: getCookie.symbols || false
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
  generatedPassword = newPassword
  generatedPasswordSelector.value = newPassword
  scorePasswordDom(newPassword)
}

const checkboxListener = function () {
  const getId = this.getAttribute('data-id')
  options[getId] = !options[getId]
  passwordGenerator()

  if (options[getId] === true) {
    this.classList.add('checked')
  } else {
    this.classList.remove('checked')
  }

  writeCookie({ key: getId, value: options[getId] })
}
const checkboxes = document.getElementsByClassName('optionCheckboxWrapper')
for (let i = 0; i < checkboxes.length; i++) {
  const checkbox = checkboxes[i]
  const getId = checkbox.getAttribute('data-id')
  checkbox.addEventListener('click', checkboxListener)

  if (options[getId] === true) {
    checkbox.classList.add('checked')
  } else {
    checkbox.classList.remove('checked')
  }
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

      writeCookie({ key: getId, value: options[getId] })
    }
  })
}
const ranges = document.getElementsByClassName('optionRange')
for (let i = 0; i < ranges.length; i++) {
  const range = ranges[i]
  const getId = range.getAttribute('data-id')
  range.addEventListener('mousedown', () => {
    rangeListener()
    range.addEventListener('mousemove', rangeListener)
  })
  range.addEventListener('mouseup', () => {
    range.removeEventListener('mousemove', rangeListener)
  })
  range.addEventListener('keydown', rangeListener)
  range.addEventListener('change', rangeListener)

  range.value = options[getId]
  const optionValue = document.getElementById(getId + 'Value')
  optionValue.innerHTML = options[getId]
}

document.getElementById('generateNewPassword').addEventListener('click', () => {
  passwordGenerator()
})

document.getElementById('copyPassword').addEventListener('click', () => {
  copyToClipboard(generatedPassword)
})

passwordGenerator()
