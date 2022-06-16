import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
import {BloggersRouter} from "./routes/bloggers-router";
const app = express()

app.use(bodyParser.json())

const port = process.env.PORT || 5000

// type BloggersType = {
//     id: number,
//     name: string,
//     youtubeUrl: string
// }

const bloggers = [
    {
        id: 0,
        name: "Dima",
        youtubeUrl: "https://www.youtube.com/watch?v=Ru06hLoFcU0"
    }
]

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, Main page Bloggers!')
})

app.get('/bloggers', (req: Request, res: Response) => {
    res.status(200).send(bloggers)
})

app.post('/bloggers', (req: Request, res: Response) => {
    const nameBodyParams = req.body.name != null ? req.body.name.trim() : null
    const youtubeUrlBodyParams = req.body.youtubeUrl != null ? req.body.youtubeUrl.trim() : null

    if (!nameBodyParams || nameBodyParams === null && nameBodyParams.length > 15 || nameBodyParams.length < 2) {
        res.status(400).json({
                "errorsMessages": [
                    {
                        "message": "Name is required",
                        "field": "name"
                    }
                ]
            }
        )
        return
    }

    if (!nameBodyParams || nameBodyParams === null && nameBodyParams.length > 100 ) {
        res.status(400).json({
                "errorsMessages": [
                    {
                        "message": "youtubeUrl is required",
                        "field": "youtubeUrl"
                    }
                ]
            }
        )
        return
    }

    const newBlogger = {
        id: +(new Date()),
        name: nameBodyParams,
        youtubeUrl: nameBodyParams
    }

    bloggers.push(newBlogger)

    res.status(201).send(newBlogger)
})



// app.use('/videos', BloggersRouter)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})