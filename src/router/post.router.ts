import { Router } from 'express';
import { verifyToken } from '../middleware/validateToken';
import { getPosts } from '../controllers/post/getPosts.controller';
import { createPost } from '../controllers/post/createPost.controller';
import { updatePost } from '../controllers/post/updatePost.controller';
import { verifyPostOwner } from '../middleware/validatePostOwner';
import { deletePost } from '../controllers/post/deletePost.controller';
import { getPost } from '../controllers/post/getPost.controller';
export const routerPost = Router();

routerPost.get('/posts', verifyToken, getPosts);
routerPost.post('/create', verifyToken, createPost);
routerPost.put('/update', verifyPostOwner, updatePost);
routerPost.delete('/delete', verifyPostOwner, deletePost);
routerPost.get('/:id', verifyToken, getPost);


