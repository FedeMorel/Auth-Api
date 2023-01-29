import { Router } from 'express';
import { createComment } from '../controllers/comment/createComment.controller';
import { deleteComment } from '../controllers/comment/deleteComment.controller';
import { getCommentsOnPost } from '../controllers/comment/getCommentsOnPost.controller';
import { updateComment } from '../controllers/comment/updateComment.controller';
import { verifyAdminOrOwner } from '../middleware/validateAdminOrOwner';
import { verifyCommentOwner } from '../middleware/validateCommentOwner';
import { verifyToken } from '../middleware/validateToken';
export const routerComment = Router();

routerComment.post('/create', verifyToken, createComment);
routerComment.put('/update', verifyCommentOwner, updateComment);
routerComment.delete('/delete', verifyAdminOrOwner, deleteComment);
routerComment.get('/:id', verifyToken, getCommentsOnPost);
