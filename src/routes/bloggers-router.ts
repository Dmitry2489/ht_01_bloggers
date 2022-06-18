import {Request, Response, Router} from "express";
import {bloggersRepository} from "../repositories/bloggers-repository";

export const BloggersRouter = Router({})


BloggersRouter.get('/', (req: Request, res: Response) => {
    const allBloggers = bloggersRepository.allBloggers()
    res.status(200).send(allBloggers)
})

BloggersRouter.post('/', (req: Request, res: Response) => {
    const nameBodyParams = req.body.name != null ? req.body.name.trim() : null
    const youtubeUrlBodyParams = req.body.youtubeUrl != null ? req.body.youtubeUrl.trim() : null
    let errorsArray = {}

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

    if (!youtubeUrlBodyParams || youtubeUrlBodyParams === null && youtubeUrlBodyParams.length > 100 ) {
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

    const newBlogger = bloggersRepository.createBlogger(nameBodyParams, youtubeUrlBodyParams)
    res.status(201).send(newBlogger)
})

BloggersRouter.get('/:bloggerId', (req: Request, res: Response) => {
    const id = +req.params.bloggerId

    if(isNaN(id)) {
        res.sendStatus(404)
    }

    const findBlogger = bloggersRepository.findByIdBlogger(id)

    if(!findBlogger) {
        res.sendStatus(404)
    } else {
        res.status(200).send(findBlogger)
    }

})

BloggersRouter.put('/:bloggerId', (req: Request, res: Response) => {
    const id = +req.params.bloggerId
    const nameBodyParams = req.body.name != null ? req.body.name.trim() : null
    const youtubeUrlBodyParams = req.body.youtubeUrl != null ? req.body.youtubeUrl.trim() : null
    const validYotodeURL = youtubeUrlBodyParams?.match('^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$')
    // console.log(validYotodeURL)

    if(isNaN(id)) {
        res.sendStatus(404)
    }

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

    if (!youtubeUrlBodyParams || youtubeUrlBodyParams === null && youtubeUrlBodyParams.length > 100 ) {
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

    const indexBlogger = bloggersRepository.updateBlogger(id, nameBodyParams, youtubeUrlBodyParams)

    if(!indexBlogger) {
        res.sendStatus(404)
    } else {
        res.sendStatus(204)
    }

})

BloggersRouter.delete('/:id', (req: Request, res: Response) => {
    const id = +req.params.id

    if(isNaN(id)) {
        res.sendStatus(404)
    }

    const indexBlogger = bloggersRepository.deleteBlogger(id)

    if (!indexBlogger){
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