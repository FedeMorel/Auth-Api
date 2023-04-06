import { Router } from 'express';
import { verifyToken } from '../middleware/validateToken';
import { getPost } from '../controllers/post/getPost.controller';
import { getPosts } from '../controllers/post/getPosts.controller';
import { createPost } from '../controllers/post/createPost.controller';
import { updatePost } from '../controllers/post/updatePost.controller';
import { deletePost } from '../controllers/post/deletePost.controller';
export const routerPost = Router();

routerPost.get('/posts', verifyToken, getPosts);
routerPost.post('/create', verifyToken, createPost);
routerPost.post('/delete', verifyToken, deletePost);
routerPost.put('/update', verifyToken, updatePost);
routerPost.get('/:id', verifyToken, getPost);


