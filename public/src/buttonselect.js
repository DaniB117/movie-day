import { movieArrays, mostrarPelicula } from '../scripts/index.js'
const poster = document.querySelector('.poster')

async function removePoster () {
  try {
    poster.lastChild.remove()
    await mostrarPelicula()
  } catch {
    await mostrarPelicula()
    throw new Error('Error al cargar')
  }
}

const liked = document.querySelector('#like')
const disliked = document.querySelector('#dislike')
const watchlist = document.querySelector('#watchlist')
const uninterested = document.querySelector('#uninterested')

liked.addEventListener('click', async () => {
  try {
    liked.disabled = true
    const movieId = poster.lastChild.getAttribute('data-id')
    if (movieId === '0') return
    movieArrays.likedMovies.push(movieId)
    await removePoster()
  } catch {
    throw new Error('Error al realizar el evento')
  } finally {
    liked.disabled = false
  }
})
disliked.addEventListener('click', async () => {
  try {
    disliked.disabled = true
    const movieId = poster.lastChild.getAttribute('data-id')
    movieArrays.dislikedMovies.push(movieId)
    await removePoster()
  } catch {
    throw new Error('Error al realizar el evento')
  } finally {
    disliked.disabled = false
  }
})

watchlist.addEventListener('click', async () => {
  try {
    watchlist.disabled = true
    const movieId = poster.lastChild.getAttribute('data-id')
    movieArrays.watchlistMovies.push(movieId)
    await removePoster()
  } catch {
    throw new Error('Error al realizar el evento')
  } finally {
    watchlist.disabled = false
  }
})

uninterested.addEventListener('click', async () => {
  try {
    uninterested.disabled = true
    const movieId = poster.lastChild.getAttribute('data-id')
    movieArrays.uninterestedMovies.push(movieId)
    await removePoster()
  } catch {
    throw new Error('Error al realizar el evento')
  } finally {
    uninterested.disabled = false
  }
})
