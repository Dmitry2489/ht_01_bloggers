import {bloggers} from "../model/Blogger";

export const bloggersRepository = {
    allBloggers() {
        return bloggers;
    },
    createBlogger(nameBodyParams: string, youtubeUrlBodyParams: string) {

        const newBlogger = {
            id: +(new Date()),
            name: nameBodyParams,
            youtubeUrl: youtubeUrlBodyParams
        }

        bloggers.push(newBlogger)

        return newBlogger;
    },
    findByIdBlogger(id: number) {
        const findBlogger = bloggers.find(b => b.id === id)

        return findBlogger;
    },
    updateBlogger(id: number, nameBodyParams: string,  youtubeUrlBodyParams: string) {
        const indexBlogger = bloggers.find(b => b.id === id)

        if(!indexBlogger) {
            return false;
        } else {
            indexBlogger.name = nameBodyParams
            indexBlogger.youtubeUrl = youtubeUrlBodyParams

            return true;
        }
    },
    deleteBlogger(id: number) {
        const indexBlogger = bloggers.findIndex(b => b.id === id)

        if (indexBlogger === -1){
            return false;
        } else  {
            bloggers.splice(indexBlogger, 1)
            return true;
        }
    }

}