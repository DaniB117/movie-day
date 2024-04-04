import { __dirname } from '../../utils.js'
import { obtenerDatos} from '../services/config.js'
import { movieFetch } from '../services/movieFetch.js'

const moviefetch = new movieFetch()

export class MovieController{
    static async getProviders (req, res) {
        const data = await obtenerDatos(moviefetch.getProviders)

        if(data) return res.json(data)

        res.status(404).json({ error: 'Provider not found' })
    }

    static async getMovies (req, res){
        const { page, i ,yearMin, yearMax, idProviders } = req.query
        const data = await obtenerDatos(moviefetch.getMovies(page, i,yearMin, yearMax, idProviders))

        if (data) return res.json(data)

        res.status(404).json({ error: 'No movies found' })
    }

    static async getMovieById (req, res){
        const { id } = req.params
        const data = await obtenerDatos(moviefetch.getMovieInfo(id))

        if (data) return res.json(data)

        res.status(404).json({ error: 'Movie not found' })
    }

    static async index (req, res){
        res.sendFile(__dirname + "/public/pages/index.html")
    }

    static async watchlist (req, res){
        res.sendFile(__dirname + "/public/pages/watchlist.html")
    }

    static async catalogue (req, res){
        res.sendFile(__dirname + "/public/pages/catalogue.html")
    }

    static async movieInfo (req, res){
        res.sendFile(__dirname + "/public/pages/movie.html")
    }
}