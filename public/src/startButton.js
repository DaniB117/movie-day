import { mostrarPelicula } from "../scripts/index.js"

const startButton = document.querySelector('.movie .start')
const botones = document.querySelector('.botones')
const button = document.querySelectorAll('.botones .button')
const posterActions = document.querySelector(".posterActions")
const poster = document.querySelector('.poster')

startButton.addEventListener('click', async () => {
    button.forEach(element => {
      element.style.cursor = 'pointer'
      element.style.pointerEvents = 'auto'
    });
    botones.style.opacity = '1'
    startButton.style.display= 'none'
    posterActions.style.display = 'flex'
    await mostrarPelicula()
    await mostrarPelicula()
    poster.lastChild.remove()
})