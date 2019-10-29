const listener = function () {
  window.requestAnimationFrame(() => {
    const getValue = this.value
    if (getValue) {
      const getId = this.getAttribute('data-id')
      const optionValue = document.getElementById(getId + 'Value')
      optionValue.innerHTML = getValue
    }
  })
}

const ranges = document.getElementsByClassName('optionRange')
for (let i = 0; i < ranges.length; i++) {
  const range = ranges[i]
  range.addEventListener('mousedown', () => {
    listener()
    range.addEventListener('mousemove', listener)
  })
  range.addEventListener('mouseup', () => {
    range.removeEventListener('mousemove', listener)
  })
  range.addEventListener('keydown', listener)
  range.addEventListener('change', listener)
}
