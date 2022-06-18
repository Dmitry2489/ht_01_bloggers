import {Request, Response, Router} from "express";
import {posts, PostsType} from "../model/Posts";
import {bloggers} from "../model/Blogger";


export const PostsRouter = Router({})

PostsRouter.get('/', (req: Request, res: Response) => {
    res.status(200).send(posts)
})

PostsRouter.post('/', (req: Request, res: Response) => {
    const titlePost: string = req.body.title.trim()
    const shortDescriptionPost: string = req.body.shortDescription.trim()
    const contentPost: string = req.body.content.trim()
    const bloggerIdPost: number = +req.body.bloggerId

    let errors = []

    if (!titlePost) {
        // res.status(400).json(
        //     {
        //         "errorsMessages": [
        //             {
        //             "message": "Title is required",
        //             "field": "title"
        //             }
        //         ]
        //     }
        // )
        // return;

        errors.push(
            {
                "message": "Title is required",
                "field": "title"
            }
        )
    }

    if (titlePost.length > 30) {
        // res.status(400).json(
        //     {
        //         "errorsMessages": [
        //             {
        //                 "message": "Title is required",
        //                 "field": "title"
        //             }
        //         ]
        //     }
        // )
        // return;

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
        // res.status(400).json(
        //     {
        //         "errorsMessages": [
        //             {
        //                 "message": "shortDescription length more than 30 characters",
        //                 "field": "shortDescription"
        //             }
        //         ]
        //     }
        // )
        // return;

        errors.push(
            {
                "message": "shortDescription length more than 100 characters",
                "field": "shortDescription"
            }
        )
    }

    if (!contentPost) {
        // res.status(400).json(
        //     {
        //         "errorsMessages": [
        //             {
        //                 "message": "contentPost is required",
        //                 "field": "contentPost"
        //             }
        //         ]
        //     }
        // )
        // return;

        errors.push(
            {
                "message": "contentPost is required",
                "field": "contentPost"
            }
        )
    }

    if (contentPost.length > 1000) {
        // res.status(400).json(
        //     {
        //         "errorsMessages": [
        //             {
        //                 "message": "contentPost length more than 100 characters",
        //                 "field": "contentPost"
        //             }
        //         ]
        //     }
        // )
        // return;

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

    const  findBlogger = bloggers.find(b => b.id === bloggerIdPost)

    if(!findBlogger) {
        res.status(400).json(
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

    // const findBlogger = bloggers.find(b => b.id === bloggerId)

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
        res.status(204)
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