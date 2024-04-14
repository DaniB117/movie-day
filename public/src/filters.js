import { showedMovies, mostrarPelicula, idArray, getActualYearMax, setActualYearMax, getActualYearMin, setActualYearMin } from '../scripts/index.js'

const currentDate = new Date()
const currentYear = currentDate.getFullYear()

const posterActions = document.querySelector('.posterActions')

const mainButton = document.querySelector('.filter svg')
const info = document.querySelector('.informacion svg')
const back = document.querySelector('.back svg')

const providers = document.querySelector('.providers')
const year = document.querySelector('.year')

const additionalButtons = document.querySelectorAll('.filters button')
const streaming = document.querySelector('#streaming')
const yearSelector = document.querySelector('#yearSelect')
const apply = document.querySelector('#apply')

const poster = document.querySelector('.poster')

mainButton.addEventListener('click', () => {
  const isActive = mainButton.classList.contains('active')
  posterActions.classList.add('shadow')
  if (!isActive) {
    additionalButtons.forEach((button, index) => {
      button.style.transitionDelay = `${index * 0.2}s`
      button.classList.add('active')
    })
    mainButton.classList.add('active')
    back.style.pointerEvents = 'none'
    info.style.pointerEvents = 'none'
  } else {
    additionalButtons.forEach((button) => {
      button.style.transitionDelay = ''
      button.classList.remove('active')
    })
    mainButton.classList.remove('active')
    posterActions.classList.remove('shadow')
    providers.classList.remove('active')
    year.classList.remove('active')
    back.style.pointerEvents = 'auto'
    info.style.pointerEvents = 'auto'
  }
})

document.addEventListener('click', (event) => {
  if (!event.target.closest('.year') &&
      !event.target.closest('.providers') &&
      !event.target.closest('.filter') &&
      !event.target.closest('.additional')) {
    additionalButtons.forEach((button) => {
      button.style.transitionDelay = ''
      button.classList.remove('active')
    })
    mainButton.classList.remove('active')
    posterActions.classList.remove('shadow')
    back.style.pointerEvents = 'auto'
    info.style.pointerEvents = 'auto'
    providers.classList.remove('active')
    year.classList.remove('active')
  }
})

streaming.addEventListener('click', () => {
  if (providers.classList.contains('active')) {
    providers.classList.remove('active')
  } else {
    providers.classList.add('active')
    year.classList.remove('active')
  }
})

yearSelector.addEventListener('click', () => {
  if (year.classList.contains('active')) {
    year.classList.remove('active')
  } else {
    year.classList.add('active')
    providers.classList.remove('active')
  }
})

const inputElement = document.querySelectorAll('.year input[type="number"]')

inputElement[0].setAttribute('max', currentYear)
inputElement[0].value = 1885

inputElement[1].setAttribute('max', currentYear)
inputElement[1].setAttribute('placeholder', `Ej. ${currentYear}`)
inputElement[1].value = currentYear

let whoChange = false
let whoChange2 = false
let whoChange3 = false
inputElement[0].addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    this.blur()
    inputElement[1].focus()
  }
})
inputElement[0].onblur = function () {
  const minYear = parseInt(inputElement[0].value)
  const maxYear = parseInt(inputElement[1].value)
  if (minYear < parseInt(this.getAttribute('min')) || this.value === '') {
    this.value = this.getAttribute('min')
  }

  if (minYear > parseInt(this.getAttribute('max'))) {
    this.value = this.getAttribute('max')
  }

  if (minYear > maxYear) {
    this.value = maxYear
  }

  if (getActualYearMin() !== parseInt(this.value)) {
    apply.classList.add('change')
    whoChange = true
  } else if (whoChange && !whoChange2 && !whoChange3) {
    apply.classList.remove('change')
    whoChange = false
  } else if (whoChange) {
    whoChange = false
  }
  // console.log(previousYearMin, this.value, whoChange)
}

inputElement[1].addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    this.blur()
  }
})

inputElement[1].onblur = function () {
  const minYear = parseInt(inputElement[0].value)
  const maxYear = parseInt(inputElement[1].value)

  if (maxYear > parseInt(this.getAttribute('max')) || this.value === '') {
    this.value = this.getAttribute('max')
  }

  if (maxYear < parseInt(this.getAttribute('min'))) {
    this.value = this.getAttribute('min')
  }

  if (maxYear < minYear) {
    this.value = minYear
  }

  if (getActualYearMax() !== parseInt(this.value)) {
    apply.classList.add('change')
    whoChange2 = true
  } else if (whoChange2 && !whoChange && !whoChange3) {
    apply.classList.remove('change')
    whoChange2 = false
  } else if (whoChange2) {
    whoChange2 = false
  }
}

let previousArray = []

providers.addEventListener('click', () => {
  if (previousArray.every(elemento => idArray.includes(elemento)) || idArray.every(elemento => previousArray.includes(elemento)) || previousArray[0] !== idArray[0]) {
    apply.classList.add('change')
    whoChange3 = true
  } else if (previousArray.length === 0 && idArray.length === 0) {
    apply.classList.remove('change')
    whoChange3 = false
  } else if (whoChange3 && !whoChange && !whoChange2) {
    whoChange3 = false
    apply.classList.remove('change')
  } else if (whoChange3) {
    whoChange3 = false
  }

  if (previousArray.length === idArray.length &&
    (previousArray.every(elemento => idArray.includes(elemento))
    ) &&
    whoChange3 && !whoChange && !whoChange2) {
    apply.classList.remove('change')
    whoChange3 = false
  } else if (previousArray.length === 0 && idArray.length === 0 &&
    whoChange3 && !whoChange && !whoChange2) {
    apply.classList.remove('change')
    whoChange3 = false
  }
})

apply.addEventListener('click', async () => {
  whoChange = false
  whoChange2 = false
  whoChange3 = false
  previousArray = idArray.slice()
  const newYearMax = parseInt(inputElement[1].value)
  if (getActualYearMin() !== parseInt(inputElement[1].value)) {
    setActualYearMax(newYearMax)
  }

  const newYearMin = parseInt(inputElement[0].value)
  if (getActualYearMin() !== newYearMin) {
    setActualYearMin(newYearMin)
  }

  apply.classList.remove('change')
  additionalButtons.forEach((button) => {
    button.style.transitionDelay = ''
    button.classList.remove('active')
  })
  mainButton.classList.remove('active')
  posterActions.classList.remove('shadow')
  back.style.pointerEvents = 'auto'
  info.style.pointerEvents = 'auto'
  providers.classList.remove('active')
  year.classList.remove('active')

  showedMovies.pop()

  poster.lastChild.remove()
  poster.lastChild.remove()

  await mostrarPelicula()
  await mostrarPelicula()
})
