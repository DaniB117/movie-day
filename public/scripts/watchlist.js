import { loadData } from '../src/localStorage.js'
import '../src/toggleBtn.js'
import '../src/extraBtn.js'

let startIndex = 0
const imagesPerPage = 10
const previousOption = ''

const svgStar = `
<svg viewBox="0 0 576 512" height="16" width="16" xmlns="http://www.w3.org/2000/svg" class="star-solid"fill="gold">
<path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
</svg>`

const svgLike = `                   
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
<path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
</svg>`

const svgDislike = `                    
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-down" viewBox="0 0 16 16">
<path d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856s-.036.586-.113.856c-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a10 10 0 0 1-.443-.05 9.36 9.36 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a9 9 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581s-.027-.414-.075-.581c-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.2 2.2 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.9.9 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1"/>
</svg>`

const svgUninterested = `     
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>`

const svgInfo = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
<path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
</svg>`

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
const catalogueList = document.querySelector('.catalogueList')
const moviesWatchlist = document.querySelector('.moviesWatchlist');
// Recuperar los datos del localstorage
({ movieArrays, showedMovies } = loadData(movieArrays, showedMovies))

// Separar los objetos en array de like/dislike/uninterested
Object.entries(movieArraysWithObjects).forEach(([key]) => {
  movieArraysWithObjects[key] = showedMovies.filter(objeto => movieArrays[key].includes(`${objeto.id}`))
})

if (movieArrays.watchlistMovies.length === 0) {
  const span = document.createElement('span')
  span.classList.add('nomovies')
  span.textContent = 'No hay películas para mostrar.'
  catalogueList.append(span)
}

function moveToNewSection (id, targetArray) {
  const index = movieArrays.watchlistMovies.indexOf(`${id}`)
  if (index !== -1) {
    movieArrays.watchlistMovies.splice(index, 1)

    if (movieArrays.watchlistMovies.length === 0) {
      const span = document.createElement('span')
      span.classList.add('nomovies')
      span.textContent = 'No hay películas para mostrar.'
      catalogueList.append(span)
    }

    targetArray.push(`${id}`)
    Object.entries(movieArrays).forEach(([key, value]) => {
      localStorage.setItem(key, JSON.stringify(value))
    })
  }
}

function mostrar (arrayWithObjects) {
  Object.entries(movieArrays).forEach(([key]) => {
    movieArrays[key] = JSON.parse(localStorage.getItem(key)) || []
  })

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
    const data = document.createElement('div')
    data.classList.add('data')
    const top = document.createElement('div')
    top.classList.add('top')
    const description = document.createElement('span')
    description.classList.add('description')
    description.textContent = `${movie.overview}`
    const bot = document.createElement('div')
    bot.classList.add('bot')

    // TOP
    const titleMovie = document.createElement('div')
    titleMovie.classList.add('titleMovie')
    const titulo = document.createElement('span')
    titulo.textContent = `${movie.title}`
    titleMovie.append(titulo)
    const calif = document.createElement('div')
    calif.classList.add('calif')
    const vote = movie.vote_average.toFixed(1)
    const stars = document.createElement('span')
    calif.innerHTML = svgStar
    stars.textContent = `${vote}`
    calif.prepend(stars)

    titleMovie.append(titulo)
    top.append(titleMovie, calif)

    // BOT
    const botones = document.createElement('div')
    botones.classList.add('botones')
    const likeButton = document.createElement('div')
    likeButton.classList.add('iconButton')
    likeButton.innerHTML = svgLike
    const dislikeButton = document.createElement('div')
    dislikeButton.classList.add('iconButton')
    dislikeButton.innerHTML = svgDislike
    const uninterestedButton = document.createElement('div')
    uninterestedButton.classList.add('iconButton')
    uninterestedButton.innerHTML = svgUninterested
    botones.append(likeButton, dislikeButton, uninterestedButton)

    const info = document.createElement('div')
    info.classList.add('info')
    const infoButton = document.createElement('div')
    infoButton.classList.add('iconButton')
    infoButton.innerHTML = svgInfo
    info.append(infoButton)

    bot.append(botones, info)

    likeButton.addEventListener('click', () => {
      div.remove()
      moveToNewSection(movie.id, movieArrays.likedMovies)
    })

    dislikeButton.addEventListener('click', () => {
      div.remove()
      moveToNewSection(movie.id, movieArrays.dislikedMovies)
    })

    uninterestedButton.addEventListener('click', () => {
      div.remove()
      moveToNewSection(movie.id, movieArrays.uninterestedMovies)
    })

    infoButton.addEventListener('click', () => {
      window.location.href = '/movie/' + movie.id
    })

    data.append(top, description, bot)
    div.append(img, data)
    moviesWatchlist.append(div)
  })
  if (arrayWithObjects.length > startIndex + imagesPerPage) {
    const loadMoreButton = document.createElement('div')
    loadMoreButton.classList.add('carga')
    const span = document.createElement('span')
    span.textContent = '+'
    loadMoreButton.append(span)
    loadMoreButton.addEventListener('click', () => {
      startIndex += imagesPerPage
      loadMoreButton.remove()
      mostrar(arrayWithObjects)
    })
    catalogueList.append(loadMoreButton)
  }
}
mostrar(movieArraysWithObjects.watchlistMovies)
