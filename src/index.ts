import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
import {BloggersRouter} from "./routes/bloggers-router";
const app = express()

app.use(bodyParser.json())

const port = process.env.PORT || 5000

type PostsType = {
    id?: number,
    title: "string",
    shortDescription: "string",
    content: "string",
    bloggerId: number,
    bloggerName?: "string"
}

const posts: Array<PostsType> = [
    {
        "id": 0,
        "title": "string",
        "shortDescription": "string",
        "content": "string",
        "bloggerId": 0,
        "bloggerName": "string"
    }
]

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, Main page Bloggers!!')
})

app.get('/posts', (req: Request, res: Response) => {
    res.status(200).send(posts)
})

app.post('/posts', (req: Request, res: Response) => {
    const titlePost: string = req.body.title.trim()
    const shortDescriptionPost: string = req.body.shortDescription.trim()
    const contentPost: string = req.body.content.trim()
    const bloggerIdPost: number = +req.body.bloggerId

    if (!titlePost) {
        res.status(400).json(
            {
                "errorsMessages": [
                    {
                        "message": "Title is required",
                        "field": "title"
                    }
                ]
            }
        )
    }

    if (!shortDescriptionPost) {
        res.status(400).json(
            {
                "errorsMessages": [
                    {
                        "message": "Title is required",
                        "field": "title"
                    }
                ]
            }
        )
    }

    const newPost = {
        title: titlePost,
        shortDescription: shortDescriptionPost,
        content: contentPost,
        bloggerId: bloggerIdPost
    }

    posts.push(<PostsType>newPost)

})


app.use('/bloggers', BloggersRouter)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})