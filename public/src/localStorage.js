export const loadData = (movieArrays, showedMovies) => {
  Object.entries(movieArrays).forEach(([key]) => {
    movieArrays[key] = JSON.parse(localStorage.getItem(key)) || []
  })
  showedMovies = JSON.parse(localStorage.getItem('showedMovies')) || []
  showedMovies.pop()
  return { movieArrays, showedMovies }
}

export const saveData = (movieArrays, showedMovies) => {
  Object.entries(movieArrays).forEach(([key, value]) => {
    localStorage.setItem(key, JSON.stringify(value))
  })
  localStorage.setItem('showedMovies', JSON.stringify(showedMovies))
}
