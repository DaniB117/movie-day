const info = document.querySelector(".informacion svg")
const poster = document.querySelector('.poster')
let showedMovies = JSON.parse(localStorage.getItem('showedMovies')) || []

info.addEventListener('click', () => {
    const ultimoHijo = poster.lastElementChild
    if (ultimoHijo) {
      const id = ultimoHijo.getAttribute('data-id')

      window.location.href = '/movie/' + id
    } 
})
  