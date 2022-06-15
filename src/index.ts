import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
const app = express()

app.use(bodyParser.json())

const port = process.env.PORT || 5000

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, Main page Bloggers!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})