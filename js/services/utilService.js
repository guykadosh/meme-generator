'use strict'

function getRandomSentence() {
  const memesSentences = [
    'I never eat falafel',
    'DOMS DOMS EVERYWHERE',
    'Stop Using i in for loops',
    'Armed in knowledge',
    'Js error "Unexpected String"',
    'One does not simply write js',
    'I`m a simple man i see vanilla JS, i click like!',
    'JS, HTML,CSS?? Even my momma can do that',
    'May the force be with you',
    'I know JS',
    'JS Where everything is made up and the rules dont matter',
    'Not sure if im good at programming or good at googling',
    'But if we could',
    'JS what is this?',
    'Write hello world , add to cv 7 years experienced',
  ]

  return memesSentences[getRandomIntInc(0, memesSentences.length - 1)]
}

function getRandomIntInc(min, max) {
  return Math.floor(Math.random() * (max - min) + 1) + min
}

function getRandomColor() {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

function calcAbsDistace(pos1, pos2) {
  return Math.sqrt((pos1.x - pos2.x) ** 2 + (pos1.y - pos2.y) ** 2)
}

function alert(msg) {
  console.log('i got called')
  const strHTMLs = `<p>${msg}</p>`

  const elAlert = document.querySelector('.alert')
  console.log(elAlert)
  elAlert.innerHTML = strHTMLs
  elAlert.classList.add('alert-open')

  setTimeout(() => {
    elAlert.classList.remove('alert-open')
    elAlert.innerHTML = ''
  }, 1000)
}
