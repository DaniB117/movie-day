import '../src/toggleBtn.js'
import '../src/extraBtn.js'
let showedMovies = []
const movieArrays =
{
  likedMovies: [],
  dislikedMovies: [],
  watchlistMovies: [],
  uninterestedMovies: []
}

Object.entries(movieArrays).forEach(([key]) => {
  movieArrays[key] = JSON.parse(localStorage.getItem(key)) || []
})
showedMovies = JSON.parse(localStorage.getItem('showedMovies')) || []

const movieId = window.location.pathname.split('/').pop()

window.addEventListener('beforeunload', () => {
  const idInt = parseInt(movieId)
  const allMovies = showedMovies.map(show => show.id)
  const indexToRemove = allMovies.indexOf(idInt)
  if (indexToRemove !== -1 && movieArrays && !Object.values(movieArrays).some(array => array.includes(movieId))) {
    showedMovies.splice(indexToRemove, 1)
    localStorage.setItem('showedMovies', JSON.stringify(showedMovies))
  }
})

async function obtenerDatos () {
  try {
    const response = await fetch(`/api/movie/${movieId}`)
    if (!response.ok) {
      throw new Error('Error al obtener los datos')
    }
    return response.json()
  } catch (error) {
    console.error('Hubo un error:', error)
  }
}
const title = document.querySelector('.title span')
const duration = document.querySelector('.duration span')
const genres = document.querySelector('.genre')
const sum = document.querySelector('.sum')
const dir_name = document.querySelector('.director .cont .name')
const dir_img = document.querySelector('.director .cont .img-cont')
const people = document.querySelector('.people')
const calif = document.querySelector('.calif span')
const poster = document.querySelector('.poster')
const cast = document.querySelector('.cast')
async function mostrar () {
  const dataMovie = await obtenerDatos()

  title.textContent = dataMovie.title
  const yearMovie = dataMovie.release_date.slice(0, 4)
  let runtime = null
  if (dataMovie.runtime < 60) {
    runtime = `${dataMovie.runtime}m`
  } else {
    const time = dataMovie.runtime / 60
    const hours = Math.floor(time)
    const minutes = (time - hours) * 60
    runtime = `${hours}h ${minutes.toFixed(0)}m`
  }
  duration.textContent = `${yearMovie} | ${runtime}`
  dataMovie.genres.forEach(genre => {
    const div = document.createElement('div')
    div.textContent = genre.name
    genres.append(div)
  })
  sum.textContent = dataMovie.overview

  const director = dataMovie.credits.crew.find(person => person.job == 'Director')
  const img = document.createElement('img')
  const img2 = document.createElement('img')
  if (director.profile_path !== null) {
    img.setAttribute('src', `https://image.tmdb.org/t/p/original/${director.profile_path}`)
    dir_img.append(img)
    img2.style.marginTop = '10px'
  }
  img2.src = '../images/no-photo-actor.webp'
  img2.style.transform = 'scale(1.6)'
  dir_img.append(img2)
  dir_name.textContent = director.name
  if (dataMovie.credits.cast.length > 0) {
    for (let i = 0; i < 6; i++) {
      const cont = document.createElement('div')
      cont.classList.add('cont')
      const img_cont = document.createElement('div')
      img_cont.classList.add('img-cont')
      const actor_img = document.createElement('img')
      if (dataMovie.credits.cast[i].profile_path === null) {
        actor_img.src = '../images/no-photo-actor.webp'
        actor_img.style.transform = 'scale(1.6)'
      } else {
        actor_img.setAttribute('src', `https://image.tmdb.org/t/p/original/${dataMovie.credits.cast[i].profile_path}`)
      }
      img_cont.append(actor_img)
      const data = document.createElement('div')
      data.classList.add('data')
      const name = document.createElement('span')
      name.classList.add('name')
      name.textContent = dataMovie.credits.cast[i].name
      const character = document.createElement('span')
      character.classList.add('character')
      character.textContent = dataMovie.credits.cast[i].character
      data.append(name, character)
      cont.append(img_cont, data)
      people.append(cont)
    }
  } else {
    cast.innerHTML = ''
  }

  calif.textContent = dataMovie.vote_average.toFixed(1)

  const poster_img = document.createElement('img')
  poster_img.setAttribute('src', `https://image.tmdb.org/t/p/original/${dataMovie.poster_path}`)
  poster.prepend(poster_img)

  const bar = document.querySelector('.bar')
  const logo_cont = document.querySelector('.logo-cont')
  const btnLeft = document.querySelector('.btn-left')
  const btnRight = document.querySelector('.btn-right')
  let scrollAmount = 0

  btnLeft.addEventListener('click', () => {
    scrollAmount -= 80
    logo_cont.scrollTo({
      left: scrollAmount,
      behavior: 'smooth'
    })
    if (scrollAmount <= 0) {
      scrollAmount = 0
    }
  })

  btnRight.addEventListener('click', () => {
    const containerWidth = logo_cont.clientWidth
    const contentWidth = logo_cont.scrollWidth
    const maxScroll = contentWidth - containerWidth
    scrollAmount += 80

    logo_cont.scrollTo({
      left: scrollAmount,
      behavior: 'smooth'
    })
    if (scrollAmount > maxScroll) {
      scrollAmount = maxScroll
    }
  })
  try {
    const providerMX = dataMovie['watch/providers'].results.MX

    const entries = Object.entries(providerMX)

    for (let i = entries.length - 1; i >= 0; i--) {
      const [key] = entries[i]

      if (key !== 'link' && key !== 'rent') {
        providerMX[key].forEach(provider => {
          const provider_img = document.createElement('img')
          const logo_div = document.createElement('div')
          logo_div.classList.add('logo')
          provider_img.setAttribute('src', `https://image.tmdb.org/t/p/original/${provider.logo_path}`)
          logo_div.append(provider_img)
          logo_cont.append(logo_div)
        })
      }
    }
    let samewidth = 0
    function checkButton () {
      const contenedorWidth = bar.clientWidth
      const contenidoWidth = logo_cont.clientWidth
      if (contenedorWidth == contenidoWidth) {
        btnRight.style.display = 'flex'
        btnLeft.style.display = 'flex'
        samewidth = contenidoWidth
      } else if (contenidoWidth >= samewidth) {
        btnRight.style.display = 'none'
        btnLeft.style.display = 'none'
      }
    }
    checkButton()
    window.addEventListener('resize', checkButton)
  } catch {
    const span = document.createElement('span')
    span.textContent = 'No está diponible en ninguna plataforma de streaming.'
    logo_cont.append(span)
  }

  const liked = document.querySelector('.like')
  const disliked = document.querySelector('.dislike')
  const watchlist = document.querySelector('.watchlist')
  const uninterested = document.querySelector('.uninterested')
  const floatingMessage = document.getElementById('floatingMessage')

  let timeoutId = null

  function showFloatingMessage (message) {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
      floatingMessage.classList.remove('animate-float')
      void floatingMessage.offsetWidth
    }

    floatingMessage.textContent = message
    floatingMessage.classList.remove('hidden')

    floatingMessage.classList.add('animate-float')

    timeoutId = setTimeout(() => {
      floatingMessage.classList.remove('animate-float')
      floatingMessage.classList.add('hidden')
      timeoutId = null
    }, 2000)
  }

  liked.addEventListener('click', async () => {
    for (const key in movieArrays) {
      const array = movieArrays[key]
      const index = array.indexOf(`${movieId}`)
      if (index !== -1) {
        array.splice(index, 1)
      }
    }
    movieArrays.likedMovies.push(movieId)

    Object.entries(movieArrays).forEach(([key, value]) => {
      localStorage.setItem(key, JSON.stringify(value))
    })
    showFloatingMessage('¡Agregado!')
  })

  disliked.addEventListener('click', async () => {
    for (const key in movieArrays) {
      const array = movieArrays[key]
      const index = array.indexOf(`${movieId}`)
      if (index !== -1) {
        array.splice(index, 1)
      }
    }
    movieArrays.dislikedMovies.push(movieId)
    Object.entries(movieArrays).forEach(([key, value]) => {
      localStorage.setItem(key, JSON.stringify(value))
    })
    showFloatingMessage('¡Agregado!')
  })

  watchlist.addEventListener('click', async () => {
    for (const key in movieArrays) {
      const array = movieArrays[key]
      const index = array.indexOf(`${movieId}`)
      if (index !== -1) {
        array.splice(index, 1)
      }
    }
    movieArrays.watchlistMovies.push(movieId)
    Object.entries(movieArrays).forEach(([key, value]) => {
      localStorage.setItem(key, JSON.stringify(value))
    })
    showFloatingMessage('¡Agregado!')
  })

  uninterested.addEventListener('click', async () => {
    for (const key in movieArrays) {
      const array = movieArrays[key]
      const index = array.indexOf(`${movieId}`)
      if (index !== -1) {
        array.splice(index, 1)
      }
    }
    movieArrays.uninterestedMovies.push(movieId)
    Object.entries(movieArrays).forEach(([key, value]) => {
      localStorage.setItem(key, JSON.stringify(value))
    })
    showFloatingMessage('¡Agregado!')
  })

  const trailer = document.querySelector('.trailer')
  const trailerBtn = document.querySelector('#trailerBtn')
  const contenido = document.querySelector('.movie')
  const video = document.querySelector('.video iframe')
  if (dataMovie.videos.results.length !== 0) {
    trailerBtn.style.display = 'flex'
    video.setAttribute('src', `https://www.youtube.com/embed/${dataMovie.videos.results[0].key}?rel=0&enablejsapi=1`)
  }
  trailerBtn.addEventListener('click', () => {
    trailer.style.display = 'block'
    liked.style.pointerEvents = 'none'
    watchlist.style.pointerEvents = 'none'
    disliked.style.pointerEvents = 'none'
    uninterested.style.pointerEvents = 'none'
    trailerBtn.style.pointerEvents = 'none'
    contenido.style.filter = 'blur(5px)'
    setTimeout(() => {
      trailer.style.opacity = '1'
    }, 100)
  })

  function controlVideo (vidFunc) {
    const iframe = document.getElementsByTagName('iframe')[0].contentWindow
    iframe.postMessage(
      '{"event":"command","func":"' + vidFunc + '","args":""}',
      '*'
    )
  }

  document.addEventListener('click', (event) => {
    if (!event.target.closest('#trailerBtn')) {
      trailer.style.opacity = '0'
      controlVideo('stopVideo')
      setTimeout(() => {
        trailer.style.display = 'none'

        contenido.style.filter = 'blur(0)'
        liked.style.pointerEvents = 'auto'
        watchlist.style.pointerEvents = 'auto'
        disliked.style.pointerEvents = 'auto'
        uninterested.style.pointerEvents = 'auto'
        trailerBtn.style.pointerEvents = 'auto'
      }, 500)
    }
  })
}

mostrar()
