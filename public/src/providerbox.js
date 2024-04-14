const providers = document.querySelector('.providers')

async function obtenerDatos () {
  try {
    const response = await fetch('/api/providers')
    if (!response.ok) {
      throw new Error('Error al obtener los datos desde el backend')
    }
    return response.json()
  } catch (error) {
    console.error('Hubo un error:', error)
  }
}

async function mostrarLogos () {
  try {
    const data = await obtenerDatos()
    data.results.forEach(provider => {
      const div = document.createElement('div')
      div.classList.add('logo')
      providers.append(div)
      const img = document.createElement('img')
      img.setAttribute('data-id', provider.provider_id)
      img.setAttribute('src', `https://image.tmdb.org/t/p/original${provider.logo_path}`)
      img.setAttribute('alt', `Logo de ${provider.name}`)
      img.addEventListener('click', obtenerIdLogo)
      div.append(img)
    })
  } catch (error) {
    console.error('Hubo un error al obtener y mostrar los logos:', error)
  }
}

const idProviders = []
export function obtenerIdLogo (event) {
  try {
    const hijo = event.target
    const padre = hijo.parentNode
    const providerClick = hijo.getAttribute('data-id')

    if (!idProviders.includes(providerClick)) {
      idProviders.push(providerClick)
      padre.classList.add('seleccionado')
    } else {
      idProviders.splice(idProviders.indexOf(providerClick), 1)
      padre.classList.remove('seleccionado')
    }
    return idProviders
  } catch {
    return idProviders
  }
}

await mostrarLogos()
