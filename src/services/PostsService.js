import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class PostsService {

    async getPosts() {
        const res = await api.get('/api/posts')
        logger.log(res.data)
        AppState.posts = res.data.posts
        AppState.nextPage = res.data.older
        AppState.previousPage = res.data.newer
    }

    async changePage(url) {
        const res = await api.get(`${url}`)
        AppState.posts = res.data.posts
        AppState.nextPage = res.data.older
        AppState.previousPage = res.data.newer
    }

    async getPostsByCreatorId(creatorId) {
        const res = await api.get('/api/posts', {
            params: {
                creatorId
            }
        })
        AppState.profilePosts = res.data.posts
    }

    async createPost(postData) {
        const res = await api.post('/api/posts', postData)
        AppState.posts = new Post(res.data.posts)
    }
}




export const postsService = new PostsService()