import { mostrar } from '../src/loadMovies.js'
import { loadData } from '../src/localStorage.js'
import '../src/toggleBtn.js'
import '../src/extraBtn.js'
let showedMovies = []
let movieArrays =
{
  likedMovies: [],
  dislikedMovies: [],
  watchlistMovies: [],
  uninterestedMovies: []
}
const movieArraysWithObjects =
{
  likedMovies: [],
  dislikedMovies: [],
  watchlistMovies: [],
  uninterestedMovies: []
}
const moviesCatalogue = document.querySelector('.moviesCatalogue')
const catalogueList = document.querySelector('.catalogueList')
function getObject () {
  ({ movieArrays, showedMovies } = loadData(movieArrays, showedMovies))

  Object.entries(movieArraysWithObjects).forEach(([key]) => {
    movieArraysWithObjects[key] = showedMovies.filter(objeto => movieArrays[key].includes(`${objeto.id}`))
  })
}

getObject()

const radioButtons = document.querySelectorAll('.input')

if (radioButtons[0].checked) {
  if (movieArraysWithObjects.likedMovies.length == 0) {
    const span = document.createElement('span')
    span.classList.add('nomovies')
    span.textContent = 'No hay películas para mostrar.'
    catalogueList.append(span)
  } else {
    mostrar(movieArraysWithObjects.likedMovies)
  }
}

radioButtons.forEach(radioButton => {
  radioButton.addEventListener('change', (event) => {
    moviesCatalogue.innerHTML = ''
    const span = document.querySelector('.nomovies')

    if (span) {
      const parentElement = span.parentElement
      parentElement.removeChild(span)
    }

    const value = event.target.value
    getObject()

    switch (value) {
      case 'option1':
        if (movieArraysWithObjects.likedMovies.length == 0) {
          const span = document.createElement('span')
          span.classList.add('nomovies')
          span.textContent = 'No hay películas para mostrar.'
          catalogueList.append(span)
        } else {
          mostrar(movieArraysWithObjects.likedMovies)
        }
        break
      case 'option2':
        if (movieArraysWithObjects.dislikedMovies.length == 0) {
          const span = document.createElement('span')
          span.classList.add('nomovies')
          span.textContent = 'No hay películas para mostrar.'
          catalogueList.append(span)
        } else {
          mostrar(movieArraysWithObjects.dislikedMovies)
        }
        break
      case 'option3':
        if (movieArraysWithObjects.uninterestedMovies.length == 0) {
          const span = document.createElement('span')
          span.classList.add('nomovies')
          span.textContent = 'No hay películas para mostrar.'
          catalogueList.append(span)
        } else {
          mostrar(movieArraysWithObjects.uninterestedMovies)
        }
        break
      default:
        console.log('Opción no reconocida')
    }
  })
})
