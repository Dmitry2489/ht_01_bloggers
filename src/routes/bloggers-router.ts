import {Request, Response, Router} from "express";
import {bloggersRepository} from "../repositories/bloggers-repository";
import {errorsType} from "../types/types";

export const BloggersRouter = Router({})


BloggersRouter.get('/', (req: Request, res: Response) => {
    const allBloggers = bloggersRepository.allBloggers()
    res.status(200).send(allBloggers)
})

BloggersRouter.post('/', (req: Request, res: Response) => {
    const nameBodyParams = req.body.name != null ? req.body.name.trim() : null
    const youtubeUrlBodyParams = req.body.youtubeUrl != null ? req.body.youtubeUrl.trim() : null
    const validYoutubeUrl = youtubeUrlBodyParams?.match('^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$')
    let errors: Array<errorsType> = []

    if (!nameBodyParams || nameBodyParams === null) {
        errors.push(
            {
                "message": "Name is required",
                "field": "Name"
            }
        )
    }


    if (nameBodyParams && nameBodyParams.length > 15 ) {
        errors.push(
            {
                "message": "Title length should be from 3 to 40 symbols",
                "field": "title"
            }
        )
    }

    if (!youtubeUrlBodyParams) {
        errors.push(
            {
                "message": "youtubeUrl is required",
                "field": "youtubeUrl"
            }
        )
    }


    if (validYoutubeUrl.length < 1) {
        errors.push(
            {
                "message": "youtubeUrl should ^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$",
                "field": "youtubeUrl"
            }
        )
    }

    if (youtubeUrlBodyParams.length > 100) {
        errors.push(
            {
                "message": "youtubeUrl length should more than 100 characters",
                "field": "youtubeUrl"
            }
        )
    }

    if (errors.length >= 1) {
        res.status(400).json(
            {
                "errorsMessages": errors
            }
        )
        return;
    }

    const newBlogger = bloggersRepository.createBlogger(nameBodyParams, youtubeUrlBodyParams)
    res.status(201).send(newBlogger)
    return;
})

BloggersRouter.get('/:bloggerId', (req: Request, res: Response) => {
    const id = +req.params.bloggerId

    if (isNaN(id)) {
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

    const findBlogger = bloggersRepository.findByIdBlogger(id)

    if (!findBlogger) {
        res.sendStatus(404)
        return;
    } else {
        res.status(200).send(findBlogger)
        // res.status(200).send('Success 1')
        return;
    }

})

BloggersRouter.put('/:bloggerId', (req: Request, res: Response) => {
    const id = +req.params.bloggerId
    const nameBodyParams = req.body.name != null ? req.body.name.trim() : null
    const youtubeUrlBodyParams = req.body.youtubeUrl != null ? req.body.youtubeUrl.trim() : null
    let validYoutubeUrl = youtubeUrlBodyParams?.match('^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$')

    let errors: Array<errorsType> = []


    if (!nameBodyParams || nameBodyParams === null) {
        errors.push(
            {
                "message": "Name is required",
                "field": "Name"
            }
        )
    }

    if (nameBodyParams.length > 15 || nameBodyParams.length < 2) {
        errors.push(
            {
                "message": "Title length should be from 3 to 40 symbols",
                "field": "title"
            }
        )
    }

    if (!youtubeUrlBodyParams) {
        errors.push(
            {
                "message": "youtubeUrl is required",
                "field": "youtubeUrl"
            }
        )
    }

    if (validYoutubeUrl.length < 1) {
        errors.push(
            {
                "message": "youtubeUrl should ^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$",
                "field": "youtubeUrl"
            }
        )
    }

    if (youtubeUrlBodyParams.length > 100) {
        errors.push(
            {
                "message": "youtubeUrl length should more than 100 characters",
                "field": "youtubeUrl"
            }
        )
    }

    if (errors.length >= 1) {
        res.status(400).json(
            {
                "errorsMessages": errors
            }
        )
        return;
    }

    if (isNaN(id)) {
        res.status(404).json({
                "errorsMessages": [
                    {
                        "message": "Name is required",
                        "field": "name"
                    }
                ]
            }
        )
        return;
    }

    // if (!nameBodyParams || nameBodyParams === null && nameBodyParams.length > 15 || nameBodyParams.length < 2) {
    //     res.status(400).json({
    //             "errorsMessages": [
    //                 {
    //                     "message": "Name is required",
    //                     "field": "name"
    //                 }
    //             ]
    //         }
    //     )
    //     return
    // }
    //
    // if (!youtubeUrlBodyParams || youtubeUrlBodyParams === null && youtubeUrlBodyParams.length > 100) {
    //     res.status(400).json({
    //             "errorsMessages": [
    //                 {
    //                     "message": "youtubeUrl is required",
    //                     "field": "youtubeUrl"
    //                 }
    //             ]
    //         }
    //     )
    //     return
    // }

    const indexBlogger = bloggersRepository.updateBlogger(id, nameBodyParams, youtubeUrlBodyParams)

    if (!indexBlogger) {
        res.sendStatus(404)
    } else {
        res.sendStatus(204)
    }

})

BloggersRouter.delete('/:id', (req: Request, res: Response) => {
    const id = +req.params.id

    if (isNaN(id)) {
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

    const indexBlogger = bloggersRepository.deleteBlogger(id)

    if (!indexBlogger) {
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