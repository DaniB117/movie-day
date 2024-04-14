import dotenv from 'dotenv'

dotenv.config()

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: process.env.API_KEY
  }
}

export async function obtenerDatos (url) {
  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      throw new Error('Error al obtener los datos')
    }
    return response.json()
  } catch (error) {
    console.error('Hubo un error:', error)
    return null
  }
}
