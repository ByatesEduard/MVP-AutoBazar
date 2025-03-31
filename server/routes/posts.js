import {Router} from 'express'
import { chechAuth } from '../middleware/checkAuth.js'
import { createPost, getAll, getById, getMyPosts, removePost } from '../controllers/posts.js'

const router = new Router()

// Create Post
// http://localhost:3002/api/posts
router.post('/', chechAuth, createPost)

// Get all posts
// http://localhost:3002/api/posts
router.get('/', getAll)


// get by id
// http://localhost:3002/api/posts/:id
router.get('/:id', getById)

// get my posts 
// http://localhost:3002/api/posts/user/me
router.get('/user/me', chechAuth, getMyPosts)

// remove post
// http://localhost:3002/api/posts/:id
router.delete('/:id', chechAuth, removePost)


export default router