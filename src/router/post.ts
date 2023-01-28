import { Router } from 'express';
import { verifyToken } from '../middleware/validateToken';
import { getPost } from '../controllers/post/getPosts.controller';
import { createPost } from '../controllers/post/createPost.controller';
import { updatePost } from '../controllers/post/updatePost.controller';
import { verifyPostOwner } from '../middleware/validatePostOwner';
import { deletePost } from '../controllers/post/deletePost.controller';
export const routerPost = Router();

routerPost.get('/posts', verifyToken, getPost);
routerPost.post('/create', verifyToken, createPost);
routerPost.put('/update', [verifyToken, verifyPostOwner], updatePost);
routerPost.delete('/delete', [verifyToken, verifyPostOwner], deletePost);


