const moviesCatalogue = document.querySelector('.moviesCatalogue')
const catalogueList = document.querySelector('.catalogueList')

let startIndex = 0
const imagesPerPage = 10
let previousOption = ''

const svgCode = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
</svg>`

const movieArrays =
{
  likedMovies: [],
  dislikedMovies: [],
  watchlistMovies: [],
  uninterestedMovies: []
}

function eliminarIdDeArrays (id) {
  for (const key in movieArrays) {
    const array = movieArrays[key]
    const index = array.indexOf(`${id}`)
    if (index !== -1) {
      array.splice(index, 1)
      if (array.length === 0) {
        const span = document.createElement('span')
        span.classList.add('nomovies')
        span.textContent = 'No hay películas para mostrar.'
        catalogueList.append(span)
      }
      return true
    }
  }
  return false
}

// Funcion para mostrar 10 peliculas y poner boton de mostrar mas.
export function mostrar (arrayWithObjects) {
  Object.entries(movieArrays).forEach(([key]) => {
    movieArrays[key] = JSON.parse(localStorage.getItem(key)) || []
  })

  if (previousOption !== JSON.stringify(arrayWithObjects)) {
    startIndex = 0
    previousOption = JSON.stringify(arrayWithObjects)
  }
  const loadMoreButton = document.querySelector('.carga')
  if (loadMoreButton) {
    loadMoreButton.remove()
  }
  const movies = arrayWithObjects.slice(startIndex, startIndex + imagesPerPage)
  movies.forEach(movie => {
    const div = document.createElement('div')
    div.classList.add('cont')
    const img = document.createElement('img')
    img.setAttribute('src', `https://image.tmdb.org/t/p/original${movie.poster_path}`)
    const overlay = document.createElement('div')
    overlay.classList.add('overlay')
    const deleteButton = document.createElement('div')
    deleteButton.classList.add('deleteButton')
    deleteButton.innerHTML = svgCode
    deleteButton.addEventListener('click', (event) => {
      div.remove()
      eliminarIdDeArrays(movie.id)
      Object.entries(movieArrays).forEach(([key, value]) => {
        localStorage.setItem(key, JSON.stringify(value))
      })
    })
    overlay.append(deleteButton)
    div.append(img, overlay)
    moviesCatalogue.append(div)
  })
  if (arrayWithObjects.length > startIndex + imagesPerPage) {
    const loadMoreButton = document.createElement('div')
    loadMoreButton.classList.add('carga')
    const mas = document.createElement('span')
    mas.textContent = '+'
    loadMoreButton.append(mas)
    loadMoreButton.addEventListener('click', () => {
      startIndex += imagesPerPage
      loadMoreButton.remove()
      mostrar(arrayWithObjects)
    })
    catalogueList.append(loadMoreButton)
  }
}
