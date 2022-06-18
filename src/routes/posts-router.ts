import {Request, Response, Router} from "express";
import {posts, PostsType} from "../model/Posts";
import {bloggers} from "../model/Blogger";
import {bloggersRepository} from "../repositories/bloggers-repository";
import {BloggersRouter} from "./bloggers-router";

export const PostsRouter = Router({})

PostsRouter.get('/', (req: Request, res: Response) => {
    res.status(200).send(posts)
})

PostsRouter.post('/', (req: Request, res: Response) => {
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

    if (!bloggerIdPost || isNaN(bloggerIdPost)) {
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

    const  findBlogger = bloggers.find(b => b.id === bloggerIdPost)

    if(!findBlogger) {
        res.status(401).json(
            {
                "errorsMessages": [
                    {
                        "message": "Blogger is unauthorized",
                        "field": "bloggerId"
                    }
                ]
            }
        )
        return;
    }

    const newPost = {
        id: +(new Date()),
        title: titlePost,
        shortDescription: shortDescriptionPost,
        content: contentPost,
        bloggerId: bloggerIdPost,
        bloggerName: findBlogger.name
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

PostsRouter.put('/:postId', (req: Request, res: Response) => {
    const id = +req.params.postId
    const titleUpdate = req.body.title
    const shortDescriptionUpdate = req.body.shortDescription
    const contentUpdate = req.body.content
    const bloggerId = req.body.bloggerId

    if(isNaN(id)) {
        res.sendStatus(400)
    }


    const findPosts = posts.find(p => p.id === id)
    console.log(bloggers)

    const findBlogger = bloggers.find(b => b.id === bloggerId)

    console.log(findPosts)
    // console.log(findBlogger)

    // if(!findBlogger) {
    //     res.status(401).json({
    //         "errorsMessages": [
    //             {
    //                 "message": "Blogger is unauthorized",
    //                 "field": "bloggerId"
    //             }
    //         ]
    //     })
    //     return;
    // }

    if(!findPosts) {
        res.sendStatus(404)
    } else {
        findPosts.title = titleUpdate
        findPosts.shortDescription = shortDescriptionUpdate
        findPosts.content = contentUpdate
        findPosts.bloggerId = bloggerId
        res.status(200).send(findPosts)
    }
})

PostsRouter.delete('/:id', (req: Request, res: Response) => {
    const id = +req.params.id

    if(isNaN(id)) {
        res.sendStatus(404)
    }

    // const indexBlogger = bloggersRepository.deleteBlogger(id)

    const indexPost = posts.findIndex(p => p.id === id)

    if (!indexPost){
        res.status(404).json({
                "errorsMessages": [
                    {
                        "message": "id is required",
                        "field": "id"
                    }
                ]
            }
        )
        return;
    } else  {
        res.sendStatus(204)
    }
})