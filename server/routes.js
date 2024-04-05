import { Router } from 'express'
import { MovieController } from './controllers/movieController.js'

export const moviesRouter = Router()

moviesRouter.get('/api/providers', MovieController.getProviders)
moviesRouter.get('/api/movies', MovieController.getMovies)
moviesRouter.get('/api/movie/:id', MovieController.getMovieById )

moviesRouter.get('/', MovieController.index)
moviesRouter.get('/watchlist', MovieController.watchlist)
moviesRouter.get('/catalogue', MovieController.catalogue)
moviesRouter.get('/movie/:id', MovieController.movieInfo)
