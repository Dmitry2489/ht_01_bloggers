import {posts, PostsType} from "../model/Posts";

export const postsRepository = {
    allPosts(){
        return posts;
    },
    createPost(titlePost: string, shortDescriptionPost: string, contentPost: string, bloggerIdPost: number){

        const  findBlogger = bloggers.find(b => b.id === bloggerIdPost)

        if(!findBlogger) {
            return false;
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
        console.log(newPost)
        return newPost;

    },
    findByIdPosts(id: number) {
        const findPosts = posts.find(p => p.id === id)

        return findPosts;
    },
    deletePosts(id: number){
        const  indexPost = posts.findIndex(p => p.id === id)

        if (indexPost === -1) {
            return false;
        } else {
            posts.splice(indexPost, 1)
            return true;
        }
    }
}