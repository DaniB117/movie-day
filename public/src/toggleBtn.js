const toggleBtn = document.querySelector('.burger')
const burgerCheckbox = document.getElementById('burgerCheckbox')
const primeros = document.querySelector('.primeros')
const ultimos = document.querySelector('.ultimos')
const aside = document.querySelector('aside')
const body = document.querySelector('body')
const tmdb = document.querySelector('.tmdb')
const userBox = document.querySelector('.user-data')
const confirmBox = document.querySelector('.confirm')
let isExpanded = true
let isProcessingClick = false

// Función para mostrar u ocultar elementos y ajustar estilos
function toggleElements(isExpanded) {
    if (isExpanded) {
        body.style.gridTemplateColumns = '0px auto auto'
        primeros.style.display = 'none'
        ultimos.style.display = 'none'
        aside.style.backgroundColor = 'rgb(32,32,32)'
        tmdb.style.display = 'none'
        userBox.style.display = 'none'
        confirmBox.style.display = 'none'
    } else {
        body.style.gridTemplateColumns = '50px auto auto'
        primeros.style.display = 'flex'
        ultimos.style.display = 'flex'
        aside.style.backgroundColor = '#050505'
    }
}

toggleBtn.addEventListener('click', () => {
    
    if (isProcessingClick) {
        toggleBtn.style.pointerEvents = 'none'
        return
    }
    
    isProcessingClick = true
    isExpanded = !isExpanded
    toggleElements(isExpanded)
  
    setTimeout(() => {
        isProcessingClick = false
        toggleBtn.style.pointerEvents = 'auto'
    }, 300)
});

window.addEventListener('resize', () => {

    if (window.innerWidth <= 810 && burgerCheckbox.checked === false) {
        isExpanded = true
        toggleElements(isExpanded)
    }
    
    if (window.innerWidth >= 810) {
        isExpanded = false
        toggleElements(isExpanded)
        burgerCheckbox.checked = false
    }
});
