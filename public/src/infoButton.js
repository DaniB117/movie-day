const info = document.querySelector(".informacion svg")
const poster = document.querySelector('.poster')
let showedMovies = JSON.parse(localStorage.getItem('showedMovies')) || []

info.addEventListener('click', () => {
    const ultimoHijo = poster.lastElementChild
    if (ultimoHijo) {
      const id = ultimoHijo.getAttribute('data-id')
      let idInt = parseInt(id)
      let allMovies = showedMovies.map(show => show.id)
      const indexToRemove = allMovies.indexOf(idInt)
      if (indexToRemove !== -1) {
      localStorage.setItem('showedMovies', JSON.stringify(showedMovies))
      }
      window.location.href = '/movie/' + id
    } 
})
  