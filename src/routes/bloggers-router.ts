import {Request, Response, Router} from "express";

export const BloggersRouter = Router({})

type BloggersType = {
    id: number,
    name: string,
    youtubeUrl: string
}

const bloggers: Array<BloggersType> = [
    {
        id: 0,
        name: "Dima",
        youtubeUrl: "https://www.youtube.com/watch?v=Ru06hLoFcU0"
    }
]


BloggersRouter.get('/', (req: Request, res: Response) => {
    res.status(200).send(bloggers)
})

BloggersRouter.post('/', (req: Request, res: Response) => {
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

    const newBlogger = {
        id: +(new Date()),
        name: nameBodyParams,
        youtubeUrl: youtubeUrlBodyParams
    }

    bloggers.push(newBlogger)

    res.status(201).send(newBlogger)
})

BloggersRouter.get('/:bloggerId', (req: Request, res: Response) => {
    const id = +req.params.bloggerId
    const findBlogger = bloggers.find(b => b.id === id)

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

    const indexBlogger = bloggers.find(b => b.id === id)
    console.log(indexBlogger, 'indexBlogger')
    if(!indexBlogger) {
        res.sendStatus(404)
    } else {
        indexBlogger.name = nameBodyParams
        indexBlogger.youtubeUrl = youtubeUrlBodyParams

        // let updatedBlogger = indexBlogger

        res.sendStatus(204)
    }

})

BloggersRouter.delete('/:id', (req: Request, res: Response) => {
    const id = +req.params.id

    const indexBlogger = bloggers.findIndex(b => b.id === id)

    if (indexBlogger === -1){
        res.status(404).json({
                "errorsMessages": [
                    {
                        "message": "id is required",
                        "field": "id"
                    }
                ]
            }
        )
        return
    } else  {
        bloggers.splice(indexBlogger, 1)
        res.sendStatus(204)
    }
})