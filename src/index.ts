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

    if (!titlePost || titlePost.length > 30) {
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
        return;
    }

    if (!shortDescriptionPost || shortDescriptionPost.length > 100) {
        res.status(400).json(
            {
                "errorsMessages": [
                    {
                        "message": "shortDescription is required",
                        "field": "shortDescription"
                    }
                ]
            }
        )
        return;
    }

    if (!contentPost || contentPost.length > 1000) {
        res.status(400).json(
            {
                "errorsMessages": [
                    {
                        "message": "contentPost is required",
                        "field": "contentPost"
                    }
                ]
            }
        )
        return;
    }

    if (!bloggerIdPost) {
        res.status(400).json(
            {
                "errorsMessages": [
                    {
                        "message": "bloggerIdPost is required",
                        "field": "bloggerIdPost"
                    }
                ]
            }
        )
        return;
    }

    const newPost = {
        title: titlePost,
        shortDescription: shortDescriptionPost,
        content: contentPost,
        bloggerId: bloggerIdPost
    }

    posts.push(<PostsType>newPost)
    res.status(201).send(newPost)
})

app.get('/posts/:postId', (req: Request, res: Response) => {
    const id = +req.params.postId
    const findPosts = posts.find(p => p.id === id)

    if(isNaN(id)) {
        res.sendStatus(400)
    }

    if(!findPosts) {
        res.sendStatus(404)
    } else {
        res.status(200).send(findPosts)
    }
})


app.use('/bloggers', BloggersRouter)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})