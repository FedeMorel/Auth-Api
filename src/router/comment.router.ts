import { Router } from 'express';
import { verifyToken } from '../middleware/validateToken';
import { createComment } from '../controllers/comment/createComment.controller';
import { deleteComment } from '../controllers/comment/deleteComment.controller';
import { updateComment } from '../controllers/comment/updateComment.controller';
import { getCommentsOnPost } from '../controllers/comment/getCommentsOnPost.controller';
import { hideComment } from '../controllers/comment/hideComment.controller';
export const routerComment = Router();

routerComment.post('/create', verifyToken, createComment);
routerComment.post('/delete', verifyToken, deleteComment);
routerComment.put('/update', verifyToken, updateComment);
routerComment.put('/hide-comment', verifyToken, hideComment);
routerComment.get('/:id', verifyToken, getCommentsOnPost);
