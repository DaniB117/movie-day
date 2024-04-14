const extra = document.querySelector('.extras')
const tmdb = document.querySelector('.tmdb')
const user = document.querySelector('.user')
const userBox = document.querySelector('.user-data')
const deleteBtn = document.querySelector('.deleteData')
const confirmBox = document.querySelector('.confirm')
const siBtn = document.querySelector('.si')
const noBtn = document.querySelector('.no')
extra.addEventListener('click', () => {
  if (tmdb.style.display === 'none' || tmdb.style.display === '') {
    tmdb.style.display = 'block'
  } else {
    tmdb.style.display = 'none'
  }
  userBox.style.display = 'none'
  confirmBox.style.display = 'none'
})

user.addEventListener('click', () => {
  if ((userBox.style.display === 'none' || userBox.style.display === '') &&
    (confirmBox.style.display === 'none' || confirmBox.style.display === '')) {
    userBox.style.display = 'block'
  } else {
    userBox.style.display = 'none'
    confirmBox.style.display = 'none'
  }
  tmdb.style.display = 'none'
})

deleteBtn.addEventListener('click', () => {
  if (confirmBox.style.display === 'none' || confirmBox.style.display === '') {
    confirmBox.style.display = 'block'
  } else {
    confirmBox.style.display = 'none'
  }
  tmdb.style.display = 'none'
  userBox.style.display = 'none'
})

siBtn.addEventListener('click', () => {
  localStorage.removeItem('watchlistMovies')
  localStorage.removeItem('dislikedMovies')
  localStorage.removeItem('likedMovies')
  localStorage.removeItem('uninterestedMovies')
  location.reload()
})

noBtn.addEventListener('click', () => {
  confirmBox.style.display = 'none'
})

document.addEventListener('click', (event) => {
  if (!event.target.closest('.tmdb') &&
    !event.target.closest('.extras') &&
    !event.target.closest('.user') &&
    !event.target.closest('.user-data') &&
    !event.target.closest('.confirm')) {
    tmdb.style.display = 'none'
    userBox.style.display = 'none'
    confirmBox.style.display = 'none'
  }
})
