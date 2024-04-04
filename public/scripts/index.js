import { loadData, saveData } from "../src/localStorage.js"
import { obtenerIdLogo } from "../src/providerbox.js"
import "../src/buttonselect.js"
import "../src/startButton.js"
import "../src/filters.js"
import "../src/infoButton.js"
import "../src/toggleBtn.js"
import "../src/extraBtn.js"

let i = 0
let page = 1
let previousUrl = null

const poster = document.querySelector('.poster')
export let movieArrays = 
{
  'likedMovies': [],
  'dislikedMovies': [],
  'watchlistMovies': [],
  'uninterestedMovies': []
}
export let showedMovies = []
let showedMoviesSession = []
export let idArray = obtenerIdLogo()
let actualYearMin = 1885

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
let actualYearMax = currentYear

export function getActualYearMin() {
  return actualYearMin
}

export function setActualYearMin(newYear) {
  actualYearMin = newYear
}

export function getActualYearMax() {
  return actualYearMax
}

export function setActualYearMax(newMaxYear) {
  actualYearMax = newMaxYear
}

async function obtenerDatos() {
  try {
    const idProviders = JSON.stringify(idArray)
    page = i < 20 ? page : ++page
    const url = `/api/movies?page=${page}&i=${i}&yearMin=${actualYearMin}&yearMax=${actualYearMax}&idProviders=${idProviders}`
    const changeConditionUrl = `page=${page}&idProviders=${idProviders}&yearMin=${actualYearMin}&yearMax=${actualYearMax}`
    if (changeConditionUrl !== previousUrl) {
      previousUrl = changeConditionUrl;
      i = 0
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Error al obtener los datos')
    }
    return response.json();
  } catch (error) {
    console.error('Hubo un error:', error);
  }
}

({ movieArrays, showedMovies } = loadData(movieArrays, showedMovies));

export async function mostrarPelicula() {
  try{
    let dataMovie = await obtenerDatos()
    let movie = dataMovie.results[i]
    let allMovies = showedMovies.map(show => show.id)
    
    while(allMovies.includes(movie.id)){
      i++
      if(i>=dataMovie.results.length){
        page++
        i=0
        dataMovie = await obtenerDatos() 
      }  
      movie = dataMovie.results[i] 
    }
    
    const article = document.createElement('article')
    poster.prepend(article)
    const div = document.createElement('div')
    div.classList.add("generalInfo")
    const yearMovie = movie.release_date.slice(0,4)
    div.innerHTML = `
      <h2>${movie.title}</h2>
      <span>${yearMovie}</span>`
    article.append(div)
    const img = document.createElement('img')
    article.setAttribute('data-id', movie.id)
    img.setAttribute('src', `https://image.tmdb.org/t/p/original${movie.poster_path}`)
    img.setAttribute('alt', `Poster de la pelicula: ${movie.title}`)
    article.append(img)
    i++
    showedMoviesSession.push(movie)
    showedMovies.push(movie)
    saveData(movieArrays, showedMovies)
    } catch(error) {
    console.log('Hubo un error al obtener la película')
  }
}

const back = document.querySelector('.back svg')

let isProcessingClick = false
back.addEventListener('click', async () => {
  if (isProcessingClick) return
  isProcessingClick = true
  try {
    let idShowedMoviesSession = showedMoviesSession.map(show => show.id)
    const returnMovies = showedMovies.slice(-3)
    const idReturnMovies = returnMovies.map(show => show.id)

    if (idShowedMoviesSession[0] === idReturnMovies[idReturnMovies.length - 2]) return

    showedMovies.splice(-3)
    poster.lastChild.remove()
    poster.lastChild.remove()
    idReturnMovies.forEach(id => {
      Object.entries(movieArrays).forEach(([key]) => {
        if (movieArrays[key].includes(`${id}`)) {
          movieArrays[key].splice(movieArrays[key].indexOf(id), 1)
        }
      })
    });
    i = Math.max(0, i - 3)
    if (i <= 1 && page > 1) {
      i = 19
      page--
    }
    await mostrarPelicula()
    await mostrarPelicula()
    showedMoviesSession.splice(-2)
  } catch (error) {
    console.error('Error:', error)
  } finally {
    isProcessingClick = false
  }
})




