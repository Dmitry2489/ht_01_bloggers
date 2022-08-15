import {Request, Response, Router} from "express";
import {posts, PostsType} from "../model/Posts";
import {bloggers} from "../model/Blogger";
import {postsRepository} from "../repositories/posts-repository";



export const PostsRouter = Router({})

PostsRouter.get('/', (req: Request, res: Response) => {
    const allPosts = postsRepository.allPosts()
    res.status(200).send(allPosts)
})

PostsRouter.post('/', (req: Request, res: Response) => {
    const titlePost: string = req.body.title.trim()
    const shortDescriptionPost: string = req.body.shortDescription.trim()
    const contentPost: string = req.body.content.trim()
    const bloggerIdPost: number = +req.body.bloggerId
    let errors = []

    if (!titlePost) {
        errors.push(
            {
                "message": "Title is required",
                "field": "title"
            }
        )
    }

    if (titlePost.length > 30) {
        errors.push(
            {
                "message": "Title length more than 30 characters",
                "field": "title"
            }
        )
    }

    if (!shortDescriptionPost) {
        errors.push(
            {
                "message": "shortDescription is required",
                "field": "shortDescription"
            }
        )
    }

    if (shortDescriptionPost.length > 100) {
        errors.push(
            {
                "message": "shortDescription length more than 100 characters",
                "field": "shortDescription"
            }
        )
    }

    if (!contentPost) {
        errors.push(
            {
                "message": "contentPost is required",
                "field": "contentPost"
            }
        )
    }

    if (contentPost.length > 1000) {
        errors.push(
            {
                "message": "contentPost length more than 100 characters",
                "field": "contentPost"
            }
        )
    }

    if(errors.length >= 1) {
        res.status(400).json(
            {
                "errorsMessages": errors
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

    const  newPost = postsRepository.createPost(titlePost, shortDescriptionPost, contentPost, bloggerIdPost )

    if(!newPost) {
        res.status(400).json(
            {
                "errorsMessages": [
                    {
                        "message": "Blogger id is required",
                        "field": "bloggerId"
                    }
                ]
            }
        )
        return;
    }

    res.status(201).send(newPost)
    return;
})

PostsRouter.get('/:postId', (req: Request, res: Response) => {
    const id = +req.params.postId

    if(isNaN(id)) {
        res.status(400).json({
                "errorsMessages": [
                    {
                        "message": "id is required",
                        "field": "id"
                    }
                ]
            }
        )
        return;
    }

    const findPosts = postsRepository.findByIdPosts(id)

    if(!findPosts) {
        res.sendStatus(404)
        return;
    } else {
        res.status(200).send(findPosts)
        return;
    }
})

PostsRouter.put('/:postId', (req: Request, res: Response) => {
    const id = +req.params.postId
    const titleUpdate = req.body.title
    const shortDescriptionUpdate = req.body.shortDescription
    const contentUpdate = req.body.content
    const bloggerId = req.body.bloggerId

    let errors = []

    if (!titleUpdate) {
        errors.push(
            {
                "message": "Title is required",
                "field": "title"
            }
        )
    }

    if (shortDescriptionUpdate.length > 30) {
        errors.push(
            {
                "message": "Title length more than 30 characters",
                "field": "title"
            }
        )
    }

    if (!shortDescriptionUpdate) {


        errors.push(
            {
                "message": "shortDescription is required",
                "field": "shortDescription"
            }
        )
    }

    if (!contentUpdate) {
        errors.push(
            {
                "message": "contentPost is required",
                "field": "contentPost"
            }
        )
    }

    if (contentUpdate.length > 1000) {
        errors.push(
            {
                "message": "contentPost length more than 100 characters",
                "field": "contentPost"
            }
        )
    }

    if(errors.length >= 1) {
        res.status(400).json(
            {
                "errorsMessages": errors
            }
        )
        return;
    }

    if(isNaN(id)) {
        res.status(400).json({
                "errorsMessages": [
                    {
                        "message": "id is required",
                        "field": "id"
                    }
                ]
            }
        )
        return;
    }

    const findPosts = posts.find(p => p.id === id)
    // console.log(bloggers)

    // const findBlogger = bloggers.find(b => b.id === bloggerId)

    // console.log(findPosts)
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
        res.sendStatus(204)
        return;
    }
})

PostsRouter.delete('/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    console.log(id)

    if(isNaN(id)) {
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
    }

    const indexPost = postsRepository.deletePosts(id)

    if (!indexPost) {
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
    } else {
        res.sendStatus(204)
        return;
    }
})