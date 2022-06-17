import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
import {BloggersRouter} from "./routes/bloggers-router";
import {PostsRouter} from "./routes/posts-router";
const app = express()

app.use(bodyParser.json())

const port = process.env.PORT || 5000



app.get('/', (req: Request, res: Response) => {
    res.send('Hello, Main page Bloggers!!')
})

app.use('/bloggers', BloggersRouter)
app.use('/posts', PostsRouter)



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})