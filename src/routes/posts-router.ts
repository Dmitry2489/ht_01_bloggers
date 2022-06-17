import {Request, Response, Router} from "express";
import {posts, PostsType} from "../model/Posts";

export const PostsRouter = Router({})

PostsRouter.get('/', (req: Request, res: Response) => {
    res.status(200).send(posts)
})

PostsRouter.post('/', (req: Request, res: Response) => {
    const titlePost: string = req.body.title.trim()
    const shortDescriptionPost: string = req.body.shortDescription.trim()
    const contentPost: string = req.body.content.trim()
    const bloggerIdPost: number = +req.body.bloggerId
    const bloggerNamePost: string = req.body.bloggerName

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
        bloggerId: bloggerIdPost,
        bloggerName: bloggerNamePost
    }

    posts.push(<PostsType>newPost)
    res.status(201).send(newPost)
})

PostsRouter.get('/:postId', (req: Request, res: Response) => {
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