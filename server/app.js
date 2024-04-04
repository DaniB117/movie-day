import express from 'express'
import { __dirname } from '../utils.js'
import { moviesRouter } from './routes.js'
 

const app = express()
app.disable('x-powered-by')

const PORT = process.env.PORT ?? 1235

  
app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
})

app.use(express.static(__dirname + "/public"))
app.use(express.json())

app.use('/', moviesRouter)
